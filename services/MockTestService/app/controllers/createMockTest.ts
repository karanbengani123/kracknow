import { CREATED } from '../../../../shared/constants/httpSuccessMessages'
import { Category, Exam, ExamBanner, ExamCity, ExamKeyword, ExamQuestion } from '../../../../shared/database/models'
import { UniqueIDGenerator } from '../../../../shared/helpers/uniqueIdGeneration'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { ICreateMockTest } from '../interface/ICreateMockTest'

export const addMockTest = async (params: IControllerParams<ICreateMockTest>) => {
  const inputs = params.input
  const transaction = params.transaction
  let freshId = {
    id: '000000',
    label: 'KNEX'
  }
  const category = await Category.findOne({
    where: {
      uuid: inputs.categoryUUID
    }
  })

  const exam = await Exam.findOne({
    where: {
      isLastRecord: true
    }
  })

  if (exam) {
    freshId.id = exam.identifier
  }
  if (category) {
    freshId.label = category.label
  }

  const examEntity = {
    title: inputs.title,
    identifier: UniqueIDGenerator.getInstance.generateID(freshId.label, freshId.id),
    categoryUUID: inputs.categoryUUID,
    description: inputs.description,
    marksPerQuestion: inputs.marksPerQuestion,
    status: 'ACTIVE',
    totalQuestions: inputs.ExamQuestion ? inputs.ExamQuestion.length : 0,
    type: inputs.type,
    isLastRecord: true,
    examBanner: { url: inputs.banner },
    examCity: inputs.ExamCity.map(item => ({
      cityUUID: item.uuid
    })),
    examKeyword: inputs.ExamKeyword.map(item => ({
      attribute: item.attribute
    })),
    questions: inputs.ExamQuestion.map(item => ({
      questionUUID: item.questionUUID
    }))
  }

  await Exam.create(examEntity, {
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
      }
    ],
    transaction
  })

  if (exam)
    await exam.update({
      isLastRecord: false
    })

  await transaction.commit()

  return {
    message: CREATED
  }
}
