import { NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { Category, City, Exam, ExamBanner, ExamCity, ExamKeyword, ExamPriceRatio, ExamQuestion, ExamRankingFactor, ExamSchedule, Question, QuestionOption } from '../../../../shared/database/models'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'

export const getMockTestDetails = async (params: IControllerParams<{}>) => {
  const mockTestDetails = await Exam.findOne({
    where: {
      uuid: params.args.params.mockTestUUID
    },
    include: [{
      model: ExamSchedule,
      as: 'schedule'
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
      include: [{
        model: City,
        as: 'cities',
        attributes: ['city', 'uuid']
      }]
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
      include: [{
        model: Question,
        as: 'examQuestions',
        attributes: ['title'],
        include: [{
          model: QuestionOption,
          as: 'options',
          attributes: ['text', 'isCorrect', 'key']
        }]
      }]
    }]
    // order: [['options', 'key', 'ASC']]
  })

  if (!mockTestDetails) {
    throw new HttpNotFound('Exam ' + NOT_FOUND)
  }
  const response = []
  const details = {
    title: mockTestDetails.title,
    marksperQuestion: mockTestDetails.marksPerQuestion,
    status: mockTestDetails.status,
    studentLimit: mockTestDetails.studentLimit,
    category: mockTestDetails.examCategory.label,
    banner: mockTestDetails.examBanner.url,
    keywords: mockTestDetails.examKeyword.map((each) => { return { attribute: each.attribute } }),
    description: mockTestDetails.description,
    questions: mockTestDetails.questions.map((each) => { return each.examQuestions }),
    cities: mockTestDetails.examCity.map((each) => {
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
