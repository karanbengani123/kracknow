import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import {
  Exam,
  ExamBanner,
  ExamCity,
  ExamKeyword,
  ExamQuestion,
  ExamPriceRatio,
  ExamRankingFactor,
  Question,
  Category
} from '../../../../shared/database/models'
import { ICreateExam } from '../interfaces/ICreateExam'
import { UniqueIDGenerator } from '../../../../shared/helpers/uniqueIdGeneration'

export const addExam = async (params: IControllerParams<ICreateExam>) => {
  const inputs = params.input
  const transaction = params.transaction
  let freshId = {
    id: '000000',
    label: 'KNEX'
  }
  const category = await Category.findByPk(inputs.categoryUUID, {
    attributes: ["label"],
    transaction
  })

  const exam = await Exam.findOne({
    where: {
      isLastRecord: true
    },
    transaction
  })

  if (exam) {
    freshId.id = exam.identifier
  }
  if (category) {
    freshId.label = category.label
  }

  for (const obj of inputs.ExamQuestion) {
    const question = await Question.findByPk(obj.questionUUID, {
      attributes: ["uuid", "appearedExamCount"]
      , transaction
    })
    if (question) {
      question.update({
        appearedExamCount: question.appearedExamCount + 1
      }, { transaction })
    }
  }
  const genId = UniqueIDGenerator.getInstance.generateID(freshId.label, freshId.id)
  const newExam = await Exam.create({
    title: inputs.title,
    identifier: genId,
    categoryUUID: inputs.categoryUUID,
    allowPrimarySelection: inputs.allowPrimarySelection,
    allowSecondarySelection: inputs.allowSecondarySelection
      ? inputs.allowSecondarySelection
      : false,
    isFeatured: inputs.isFeatured,
    marksPerQuestion: inputs.marksPerQuestion,
    status: 'UNSCHEDULED',
    totalQuestions: inputs.ExamQuestion ? inputs.ExamQuestion.length : 0,
    studentLimit: inputs.studentLimit,
    isFree: inputs.isFree,
    joinFee: inputs.joinFee ? inputs.joinFee : 0,
    type: inputs.type,
    joinDelay: inputs.joinDelay,
    totalWinningPrize: inputs.totalWinningPrize ? inputs.totalWinningPrize : 0,
    timePerQuestion: inputs.timePerQuestion,
    isLastRecord: true,
    description: inputs.description || null,
    examBanner: {
      url: inputs.ExamBanner,
      phoneBanner: inputs.phoneBanner ? inputs.phoneBanner : null
    },
    examCity: inputs.ExamCity.map((item) => ({
      cityUUID: item.uuid
    })),
    examKeyword: inputs.ExamKeyword.map((item) => ({
      attribute: item.attribute
    })),
    questions: inputs.ExamQuestion.map((item) => ({
      questionUUID: item.questionUUID
    })),
    examprice: inputs.ExamPrice.map((item) => ({
      toValue: item.toValue,
      fromValue: item.fromValue ? item.fromValue : 0,
      amount: item.price
    })),
    examRankingFactor: inputs.ExamRankingFactor.map((item) => ({
      type: item.type,
      title: item.title,
      time: item.time,
      points: item.point,
      coins: item.coins
    }))
  }, {
    include: [
      {
        model: ExamBanner,
        as: 'examBanner'
      },
      {
        model: ExamCity,
        as: 'examCity'
      },
      {
        model: ExamKeyword,
        as: 'examKeyword'
      },
      {
        model: ExamQuestion,
        as: 'questions'
      },
      {
        model: ExamPriceRatio,
        as: 'examprice'
      },
      {
        model: ExamRankingFactor,
        as: 'examRankingFactor'
      }
    ],
    transaction
  })
  if (newExam)
    await Exam.update({ isLastRecord: false }, { where: { isLastRecord: true }, transaction })

  await transaction.commit()

  return {
    message: 'Exam created successfully',
    payload: {}
  }
}
