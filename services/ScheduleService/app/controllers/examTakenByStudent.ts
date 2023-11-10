import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages';
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { IExamTaken } from '../interfaces/IExamTaken'
import * as moment from 'moment'
import { Exam, ExamParticipationQuestion, ExamParticipationQuestionOption, ExamRankingFactor, ExamSchedule, Question, QuestionOption, ScheduleExamParticipation } from '../../../../shared/database/models';
import { EXAM_NOT_FOUND, YOU_ARE_NOT_PARTICIPATED } from '../../../../shared/constants/httpErrorMessages';
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound';
import { HttpBadRequest } from '../../../../shared/exceptions/HttpBadRequest';

export const examTakenByStudent = async (
  params: IControllerParams<IExamTaken>
) => {
  const transaction = params.transaction
  const data = params.input;
  const examParticipationId = params.args.params.examParticipationUUID;

  const SKIP_OR_TIMEOUT = ["SKIPPED", "TIME_OUT"].indexOf(data.status) !== -1;

  const now = moment().utcOffset('+05:30').format('LTS')
  const mins = moment
    .utc(moment(now, 'HH:mm:ss')
      .diff(moment(data.time, 'HH:mm:ss')))
    .format('mm:ss')

  const [answerTimeMinSegment, answerTimeSecSegment] = mins.split(':').map(item => parseInt(item));
  const answeredTime = answerTimeMinSegment * 60 + answerTimeSecSegment;

  const [participation, exam, options, ranking, question] = await Promise.all([
    ScheduleExamParticipation.findByPk(examParticipationId),
    Exam.findOne({
      where: { uuid: data.examUUID },
      attributes: ['uuid', 'marksPerQuestion'],
    }),
    QuestionOption.findOne({
      where: {
        isCorrect: true,
        questionUUID: data.questionUUID
      },
    }),
    ExamRankingFactor.findAll({
      where: {
        examUUID: data.examUUID
      },
    }),
    Question.findOne({
      where: {
        uuid: data.questionUUID
      },
      attributes: ['title'],
    })
  ]);

  if (!participation) {
    throw new HttpNotFound(YOU_ARE_NOT_PARTICIPATED)
  }

  if (!exam) {
    throw new HttpNotFound("The exam does not exist")
  }

  const scheduledExam = await ExamSchedule.findByPk(participation.examScheduleUUID, {
    attributes: ["uuid", "endTime"]
  })

  if (!scheduledExam) {
    throw new HttpNotFound(EXAM_NOT_FOUND)
  }

  if (moment().utc() > moment(scheduledExam.endTime).utc()) {
    throw new HttpBadRequest('exam time already completed')
  }

  const marksPerQuestion = exam.marksPerQuestion
  const isCorrect = [options.text, options.key].indexOf(data.givenAnswer) !== -1;
  console.log("is correct", isCorrect)
  const participantQuestion = await ExamParticipationQuestion.findOne({
    where: {
      examParticipationUUID: params.args.params.examParticipationUUID,
      questionUUID: data.questionUUID
    },
    transaction
  });

  let questionMark = 0;
  let questionPoint = 0;

  const timeCheck = (doesTimeApply: boolean, timeTaken: number, maxTime: number) => doesTimeApply && timeTaken <= maxTime

  if (!SKIP_OR_TIMEOUT) {
    if (isCorrect) {
      questionMark += marksPerQuestion;
    }

    for (const rank of ranking) {
      const isTimeApplied = rank.time > 0;
      const timeLimit = isTimeApplied ? rank.time + 2 : rank.time;

      if (!isCorrect) {
        if (rank.type === "ON_INCORRECT_ANSWER") {
          questionMark -= rank.points
          questionPoint -= rank.coins
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

      if (rank.type === "PRIMARY" && data.categoryType === "PRIMARY" && timeCheck(isTimeApplied, answeredTime, timeLimit)) {
        questionMark += rank.points
        questionPoint += rank.coins
      }

      if (rank.type === "SECONDARY" && data.categoryType === "SECONDARY" && timeCheck(isTimeApplied, answeredTime, timeLimit)) {
        questionMark += rank.points
        questionPoint += rank.coins
      }
    }
  }

  let consolidatedMark = participation.marks !== null ? participation.marks : 0;
  let consolidatedPoint = participation.coins !== null ? participation.coins : 0;
  console.log('consolidated point', consolidatedPoint + questionPoint - (participantQuestion ? participantQuestion.coin : 0))
  await participation.update({
    coins: consolidatedPoint + questionPoint - (participantQuestion ? participantQuestion.coin : 0),
    marks: consolidatedMark + questionMark - (participantQuestion ? participantQuestion.mark : 0),
    status: data.isLastRecord === true ? 'COMPLETED' : 'NOT_COMPLETED'
  }, { transaction })

  if (participantQuestion) {
    await participantQuestion.update({
      title: question.title,
      givenAnswer: data.givenAnswer,
      status: data.status,
      isCorrect: isCorrect,
      mark: questionMark,
      coin: questionPoint,
    }, { transaction })
  } else {
    await ExamParticipationQuestion.create({
      examParticipationUUID: params.args.params.examParticipationUUID,
      questionUUID: data.questionUUID,
      title: question.title,
      givenAnswer: data.givenAnswer,
      status: data.status,
      isCorrect: isCorrect,
      mark: questionMark,
      coin: questionPoint,
      examParticipation: data.options.map((item) => ({
        key: item.key,
        image: item.image ? item.image : null,
        text: item.text,
        correctAnswer: item.text === options.text
      }))
    }, {
      include: [
        {
          model: ExamParticipationQuestionOption,
          as: 'examParticipation'
        }
      ],
      transaction
    });
  }

  await transaction.commit()

  return {
    message: SUCCESSFUL
  }
}