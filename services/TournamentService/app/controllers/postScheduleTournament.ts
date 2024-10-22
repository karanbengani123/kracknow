import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";
import { Exam, Tournament, TournamentExamSchedule, TournamentScheduledExam } from "../../../../shared/database/models";
import { HttpNotFound } from "../../../../shared/exceptions/HttpNotFound";
import { TOURNAMENT_NOT_FOUND } from "../../../../shared/constants/httpErrorMessages";
import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import * as moment from "moment-timezone";
import { IScheduleTournament } from "../interfaces/IScheduleTournament";
import TournamentSchedule from "../../../../shared/database/models/TournamentSchedule";
import {
  SCHEDULED, TOURNAMENT,
} from "../../../../shared/constants/message";
import { EventBridge, config } from 'aws-sdk'
import { prepareMessageFromTemplate } from "../../../../shared/helpers/prepareMessageFromTemplate";
import { v4 } from 'uuid'

config.update({ region: process.env.AWS_S3_REGION })
const eventBridge = new EventBridge({ apiVersion: '2015-10-07' })

export const postScheduleTournament = async (
  params: IControllerParams<IScheduleTournament>
) => {
  const transaction = params.transaction;
  try {
    const { exam, timeZone, tournamentUUID } = params.input;
    
    // Fetch the tournament
    const tournament = await Tournament.findByPk(tournamentUUID, {
      attributes: ["uuid", "title"],
      include: [
        {
          model: TournamentExamSchedule,
          as: "tournamentExamSchedule",
          attributes: ["uuid", "createdAt"],
          include: [
            {
              model: Exam,
              as: "tournamentExamDetails",
              attributes: ["uuid"],
            },
          ],
        },
      ],
    });

    if (!tournament) {
      throw new HttpNotFound(TOURNAMENT_NOT_FOUND);
    }

    // Exam schedule validation
    if (exam.length !== tournament.tournamentExamSchedule.length)
      throw new HttpNotFound("Please schedule all exams in the tournament");

    exam.forEach(o => {
      if (!tournament.tournamentExamSchedule.find(eo => o.examUUID === eo.tournamentExamDetails.uuid && o.examScheduleUUID === eo.uuid))
        throw new HttpNotFound("examUUID or  examScheduleUUID not found");
    });

    // Sorting and time calculations
    const sortedTime = exam.sort((a, b) => +new Date(a.startTime) - +new Date(b.startTime));
    const sTime = moment.tz(sortedTime[0].startTime, timeZone).utc();
    const eTime = moment.tz(sortedTime[sortedTime.length - 1].endTime, timeZone).utc();

    // Save schedule to the database
    const schedule = await TournamentSchedule.create(
      {
        startTime: sTime.toString(),
        endTime: eTime.toString(),
        tournamentUUID: tournament.uuid,
        tournamentTime: "BASED_ON_TIME",
        status: SCHEDULED,
        joined: 0,
      },
      { transaction }
    );

    // Create tournament scheduled exams
    await TournamentScheduledExam.bulkCreate(exam.map(o => {
      const startTime = moment.tz(o.startTime, timeZone).utc();
      const endTime = moment.tz(o.endTime, timeZone).utc();
      return {
        tournamentScheduleUUID: schedule.uuid,
        tournamentExamScheduleUUID: o.examScheduleUUID,
        examUUID: o.examUUID,
        startTime: startTime.toString(),
        endTime: endTime.toString(),
        examTime: o.examTime,
        status: SCHEDULED,
      };
    }), { transaction });

    // EventBridge Rule creation
    const genRuleName = (type: string) => `tournament-reminder-${type}-${v4()}`;
    const id = v4();
    const eventBridgestartTimeExpression = sTime
      .subtract(parseInt(process.env.REMINDER_TIME_BEFORE_START_EXAM), 'minutes')
      .format('m H D M ? YYYY');
    
    const ruleNameStart = genRuleName('start');
    await eventBridge
      .putRule({
        Name: ruleNameStart,
        ScheduleExpression: `cron(${eventBridgestartTimeExpression})`,
        State: 'ENABLED',
      })
      .promise();

    await eventBridge
      .putTargets({
        Rule: ruleNameStart,
        Targets: [
          {
            Arn: `arn:aws:lambda:${process.env.TOURNAMENT_REMINDER_LAMBDA_ARN}`,
            Id: id,
            Input: JSON.stringify({
              message: prepareMessageFromTemplate(
                process.env.REMINDER_TOURNAMENT_START,
                {
                  type: TOURNAMENT,
                  tournament: tournament.title,
                  time: process.env.REMINDER_TIME_BEFORE_START_EXAM
                }
              ),
              eventType: 'startTime',
              ruleName: ruleNameStart,
              targetId: id,
              tournamentScheduleUUID: schedule.uuid,
            }),
          }
        ]
      })
      .promise();

    // Commit the transaction
    await transaction.commit();
    return { message: SUCCESSFUL };
  } catch (error) {
    console.error("Error in postScheduleTournament:", error);
    if (transaction) {
      await transaction.rollback();  // Rollback transaction if any error occurs
    }
    throw error;  // Rethrow error to be handled by the API response handler
  }
};

