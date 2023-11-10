import * as moment from 'moment'
import { EXAM_ALREADY_FINISHED, EXAM_NOT_FOUND, EXAM_NOT_STARTED, TOURNAMENT_ALREADY_FINISHED, TOURNAMENT_NOT_STARTED, TOURNAMENT_PARTICIPATION_NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { APPEARED, COMPLETED } from '../../../../shared/constants/message'
import {
  QuestionOption,
  Question,
  TournamentParticipation,
  TournamentExamParticipationQuestion,
  TournamentExamParticipationQuestionOption,
  TournamentSchedule,
  StudentCompletedTournamentExamsStatus,
  TournamentRankingFactor,
  Tournament,
  TournamentScheduledExam
} from '../../../../shared/database/models'
import { HttpBadRequest } from '../../../../shared/exceptions/HttpBadRequest'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { IExamTaken } from '../interfaces/IExamTaken'
import { publishToTopic } from '../../../../shared/lib/aws/sns/publishToTopic'

export const postAnswerSubmit = async (
  params: IControllerParams<IExamTaken>
) => {
  const {
    questionUUID,
    status,
    givenAnswer,
    description,
    examUUID,
    categoryType,
    time,
    isLastRecord } = params.input
  const transaction = params.transaction
  const tournamentParticipationUUID = params.args.params.tournamentParticipationUUID

  const SKIP_OR_TIMEOUT = ["SKIPPED", "TIME_OUT"].indexOf(status) !== -1;

  const [answerTimeMinSegment, answerTimeSecSegment] = moment 
    .utc(moment(moment().utcOffset('+05:30').format('LTS'), 'HH:mm:ss').diff(moment(time, 'HH:mm:ss')))
    .format('mm:ss').split(':').map(item => parseInt(item));
  const answeredTime = answerTimeMinSegment * 60 + answerTimeSecSegment;

  const now = moment().utc();

  const [participation, options, participantQuestion] = await Promise.all([await TournamentParticipation.findOne({
    where: {
      uuid: tournamentParticipationUUID
    },
    include: [{
      model: TournamentSchedule, as: "tournamentSchedule",
      attributes: ["uuid", "startTime", "endTime", "tournamentTime"]
    }]
  }),
  QuestionOption.findOne({
    where: {
      isCorrect: true,
      questionUUID
    }
  }),
  TournamentExamParticipationQuestion.findOne({
    where: {
      tournamentParticipationUUID,
      examUUID,
      questionUUID
    }
  })
  ])
  if (!participation) {
    throw new HttpBadRequest(TOURNAMENT_PARTICIPATION_NOT_FOUND);
  }
  const schedule = participation.tournamentSchedule[0]

  if (now > moment(schedule.endTime).utc())
    throw new HttpBadRequest(TOURNAMENT_ALREADY_FINISHED)

  else if (now < moment(schedule.startTime).utc())
    throw new HttpBadRequest(TOURNAMENT_NOT_STARTED)

  const exam = await TournamentScheduledExam.findOne({
    where: {
      tournamentScheduleUUID: schedule.uuid,
      examUUID
    }
  })
  if (!exam)
    throw new HttpBadRequest(EXAM_NOT_FOUND)


  if (now > moment(exam.endTime).utc())
    throw new HttpBadRequest(EXAM_ALREADY_FINISHED)

  else if (now < moment(exam.startTime).utc())
    throw new HttpBadRequest(EXAM_NOT_STARTED)

  const tournament = await Tournament.findByPk(participation.tournamentUUID, {
    attributes: ['uuid', 'marksPerQuestion']
  })

  const ranking = await TournamentRankingFactor.findAll({
    where: {
      tournamentUUID: participation.tournamentUUID
    }
  })
  const marksPerQuestion = tournament.marksPerQuestion
  const isCorrect = [options.text, options.key].indexOf(givenAnswer) !== -1;
  let questionMark = 0;
  let questionPoint = 0;
  const timeCheck = (doesTimeApply: boolean, timeTaken: number, maxTime: number) => doesTimeApply && timeTaken <= maxTime

  if (!SKIP_OR_TIMEOUT) {
    if (isCorrect)
      questionMark += marksPerQuestion;

    for (const rank of ranking) {
      const isTimeApplied = rank.time > 0;
      const timeLimit = isTimeApplied ? rank.time + 2 : rank.time;
      console.log("after ")
      if (!isCorrect) {
        if (rank.type === "ON_INCORRECT_ANSWER") {
          questionMark -= rank.points
          questionPoint -= rank.coins
          console.log("after incorrect calculation ", questionMark, questionPoint)
        }
        continue;
      }

      if (rank.type === "ON_CORRECT_ANSWER" && timeCheck(isTimeApplied, answeredTime, timeLimit)) {
        questionMark += rank.points
        questionPoint += rank.coins
      }

      if (rank.type === "TIME_LIMIT" && timeCheck(isTimeApplied, answeredTime, timeLimit)) {
        questionMark += rank.points
        questionPoint += rank.coins
      }

      if (rank.type === "PRIMARY" && categoryType === "PRIMARY" && timeCheck(isTimeApplied, answeredTime, timeLimit)) {
        questionMark += rank.points
        questionPoint += rank.coins
      }

      if (rank.type === "SECONDARY" && categoryType === "SECONDARY" && timeCheck(isTimeApplied, answeredTime, timeLimit)) {
        questionMark += rank.points
        questionPoint += rank.coins
      }
    }
  }
  const question = await Question.findOne({
    where: {
      uuid: questionUUID
    },
    attributes: ['title']
  })

  let consolidatedMark = participation.marks !== null ? participation.marks : 0;
  let consolidatedPoint = participation.coins !== null ? participation.coins : 0;
  await participation.update({
    coins: consolidatedPoint + questionPoint - (participantQuestion ? participantQuestion.coin : 0),
    marks: consolidatedMark + questionMark - (participantQuestion ? participantQuestion.mark : 0),
    status: isLastRecord === true ? COMPLETED : APPEARED,
  }, { transaction })

  if (participantQuestion) {
    await participantQuestion.update({
      givenAnswer,
      isCorrect,
      status,
      mark: questionMark,
      coin: questionPoint
    }, { transaction });
  } else {
    await TournamentExamParticipationQuestion.create({
      tournamentParticipationUUID,
      examUUID,
      questionUUID,
      title: question.title,
      givenAnswer,
      status,
      mark: questionMark,
      coin: questionPoint,
      isCorrect,
      description,
      tournamentExamParticipationQuestionOption: params.input.options.map((item) => ({
        tournamentExamParticipationQuestionUUID: tournamentParticipationUUID,
        key: item.key,
        image: item.image ? item.image : null,
        text: item.text,
        correctAnswer: item.text === options.text ? true : false
      }))
    }, {
      include: [
        {
          model: TournamentExamParticipationQuestionOption,
          as: 'tournamentExamParticipationQuestionOption'
        }
      ],
      transaction
    })
  }
  console.log("*********************", isLastRecord)
  if (isLastRecord) {
    console.log("***************inside last record********", isLastRecord)
    await StudentCompletedTournamentExamsStatus.update({ completed: true }, {
      where: {
        examUUID,
        tournamentParticipationUUID: participation.uuid
      },
      transaction
    })
    await exam.update({ status: COMPLETED }, { transaction })
    console.log("*******************topic started*******************")
    await publishToTopic(process.env.TOURNAMENT_RANK_UPDATE_EVENT, {
      participationUUID: participation.tournamentScheduleUUID
    });
    console.log("*******************topic ended*******************")
  }

  await transaction.commit()
  return {
    message: SUCCESSFUL
  }
}