import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";
import { HttpNotFound } from "../../../../shared/exceptions/HttpNotFound";
import { TOURNAMENT_NOT_SCHEDULED } from "../../../../shared/constants/httpErrorMessages";
import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import * as moment from "moment-timezone";
import { IScheduleTournament } from "../interfaces/IScheduleTournament";
import TournamentSchedule from "../../../../shared/database/models/TournamentSchedule";
import {
  SCHEDULED,
  TOURNAMENT,
} from "../../../../shared/constants/message";
import { EventBridge, config } from 'aws-sdk'
import { prepareMessageFromTemplate } from "../../../../shared/helpers/prepareMessageFromTemplate";
import { v4 } from 'uuid'
import { Exam, Tournament, TournamentExamSchedule, TournamentScheduledExam } from "../../../../shared/database/models";

config.update({ region: process.env.AWS_S3_REGION })
const eventBridge = new EventBridge({ apiVersion: '2015-10-07' })

export const putScheduleTournamentUpdate = async (
  params: IControllerParams<IScheduleTournament>
) => {
  const transaction = params.transaction;
  const { exam, timeZone, tournamentScheduleUUID } = params.input;
  const tournamentSchedule = await TournamentSchedule.findByPk(tournamentScheduleUUID);

  if (!tournamentSchedule) {
    throw new HttpNotFound(TOURNAMENT_NOT_SCHEDULED);
  }
  const tournament = await Tournament.findByPk(tournamentSchedule.tournamentUUID, {
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
  exam.forEach(o => {
    if (!tournament.tournamentExamSchedule.find(eo => o.examUUID === eo.tournamentExamDetails.uuid && o.examScheduleUUID === eo.uuid))
      throw new HttpNotFound("examUUID or  examScheduleUUID not found")
  })

  const sortedTime = exam.sort((a, b) => +new Date(a.startTime) - +new Date(b.startTime))
  const sTime = moment.tz(sortedTime[0].startTime, timeZone).utc();
  const eTime = moment.tz(sortedTime[sortedTime.length - 1].endTime, timeZone).utc();

  const schedule = await tournamentSchedule.update(
    {
      startTime: sTime.toString(),
      endTime: eTime.toString()
    }, { transaction }
  );

  exam.forEach(async (o) => {
    await TournamentScheduledExam.update({
      startTime: moment.tz(o.startTime, timeZone).utc(),
      endTime: moment.tz(o.endTime, timeZone).utc(),
      examTime: o.examTime,
      status: SCHEDULED
    }, {
      where: {
        tournamentScheduleUUID: tournamentSchedule.uuid,
        tournamentExamScheduleUUID: o.examScheduleUUID,
        examUUID: o.examUUID,
      }
    })
  })

  //event bridge started
  const genRuleName = (type: string) => `exam-reminder-${type}-${v4()}`
  const id = v4()
  // Schedule an event to send the notification before x time
  const eventBridgestartTimeExpression = sTime
    .subtract(parseInt(process.env.REMINDER_TIME_BEFORE_START_EXAM), 'minutes')
    .format('m H D M ? YYYY')
  const ruleNameStart = genRuleName('start')

  await eventBridge
    .putRule({
      Name: ruleNameStart,
      ScheduleExpression: `cron(${eventBridgestartTimeExpression})`,
      State: 'ENABLED'
    })
    .promise()
  await eventBridge
    .putTargets({
      Rule: ruleNameStart,
      Targets: [
        {
          Arn: `arn:aws:lambda:${process.env.REMINDER_LAMBDA_ARN}`,
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
            eventType: 'tournament',
            ruleName: ruleNameStart,
            targetId: id,
            tournamentScheduleUUID: schedule.uuid
          })
        }
      ]
    })
    .promise()
  // Schedule an event to send the notification on exam completion
  const eventBridgeendTimeExpression = eTime.format('m H D M ? YYYY')
  const ruleNameEnd = genRuleName('end')

  await eventBridge
    .putRule({
      Name: ruleNameEnd,
      ScheduleExpression: `cron(${eventBridgeendTimeExpression})`,
      State: 'ENABLED'
    })
    .promise()

  await eventBridge
    .putTargets({
      Rule: ruleNameEnd,
      Targets: [
        {
          Arn: `arn:aws:lambda:${process.env.REMINDER_LAMBDA_ARN}`,
          Id: id,
          Input: JSON.stringify({
            message: prepareMessageFromTemplate(
              process.env.REMINDER_TOURNAMENT_COMPLETED,
              {
                type: TOURNAMENT,
                tournament: tournament.title
              }
            ),
            eventType: 'tournament',
            ruleName: ruleNameEnd,
            targetId: id,
            tournamentScheduleUUID: schedule.uuid
          })
        }
      ]
    })
    .promise()

  await transaction.commit();
  return {
    message: SUCCESSFUL,
  };
};
