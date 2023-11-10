import { NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import {
  Category,
  City,
  Exam,
  ExamBanner,
  ExamCity,
  ExamKeyword,
  ExamPriceRatio,
  ExamQuestion,
  ExamRankingFactor,
  ExamSchedule,
  Question,
  QuestionOption
} from '../../../../shared/database/models'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'

export const getExamDetails = async (params: IControllerParams<null>) => {
  const examsDetails = await Exam.findOne({
    where: {
      uuid: params.args.params.examUUID
    },
    include: [
      {
        model: ExamSchedule,
        as: 'schedule',
        order: [['createdAt', 'DESC']],
        limit: 1
      },
      {
        model: ExamBanner,
        as: 'examBanner'
      },
      {
        model: ExamKeyword,
        as: 'examKeyword'
      },
      {
        model: Category,
        as: 'examCategory',
        attributes: ['uuid', 'label']
      },
      {
        model: ExamCity,
        as: 'examCity',
        include: [
          {
            model: City,
            as: 'cities',
            attributes: ['city', 'uuid']
          }
        ]
      },
      {
        model: ExamPriceRatio,
        as: 'examprice'
      },
      {
        model: ExamRankingFactor,
        as: 'examRankingFactor'
      },
      {
        model: ExamQuestion,
        as: 'questions',
        include: [
          {
            model: Question,
            as: 'examQuestions',
            attributes: ['uuid', 'title'],
            include: [
              {
                model: QuestionOption,
                as: 'options',
                attributes: ['text', 'isCorrect', 'key', 'image']
              }
            ]
          }
        ]
      }
    ],
    order: [['examprice', 'toValue', 'ASC']]
  })

  if (!examsDetails) {
    throw new HttpNotFound('Exam ' + NOT_FOUND)
  }
  const response = []
  const details = {
    title: examsDetails.title,
    categoryUUID: examsDetails.categoryUUID,
    startTime: examsDetails.schedule.length
      ? examsDetails.schedule[0].startTime
      : null,
    endTime: examsDetails.schedule.length
      ? examsDetails.schedule[0].endTime
      : null,
    marksperQuestion: examsDetails.marksPerQuestion,
    joiningFees: examsDetails.joinFee,
    allowPrimarySelection: examsDetails.allowPrimarySelection,
    allowSecondarySelection: examsDetails.allowSecondarySelection,
    status: examsDetails.status,
    studentLimit: examsDetails.studentLimit,
    category: examsDetails.examCategory.label,
    banner: examsDetails.examBanner.url,
    phoneBanner: examsDetails.examBanner.phoneBanner,
    keywords: examsDetails.examKeyword.map((each) => {
      return { attribute: each.attribute }
    }),
    isFeatured: examsDetails.isFeatured,
    isFree: examsDetails.isFree,
    description: examsDetails.description,
    joinDelay: examsDetails.joinDelay,
    totalWinningPrize: examsDetails.totalWinningPrize,
    timePerQuestion: examsDetails.timePerQuestion,
    questions: examsDetails.questions.map((each) => {
      return each.examQuestions
    }),
    priceRatio: examsDetails.examprice.map((each) => {
      return {
        uuid: each.uuid,
        toValue: each.toValue,
        fromValue: each.fromValue,
        amount: each.amount
      }
    }),
    rankingFactor: examsDetails.examRankingFactor.map((each) => {
      return {
        uuid: each.uuid,
        type: each.type,
        title: each.title,
        points: each.points,
        time: each.time,
        coins: each.coins
      }
    }),
    cities: examsDetails.examCity.map((each) => {
      return {
        uuid: each.cities.uuid,
        city: each.cities.city
      }
    })
  }

  response.push(details)

  return {
    message: SUCCESSFUL,
    payload: {
      response: response[0]
    }
  }
}
