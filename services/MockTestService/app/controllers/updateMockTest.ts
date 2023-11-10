import { NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { Exam, ExamBanner, ExamCity, ExamKeyword, ExamQuestion } from '../../../../shared/database/models'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { IUpdateMockTest } from '../interface/IUpdateMockTest'

export const updateMockTest = async (params: IControllerParams<IUpdateMockTest>) => {
  const inputs = params.input
  const transaction = params.transaction

  const exam = await Exam.findOne({
    where: {
      uuid: params.args.params.examUUID
    }
  })

  if (!exam) {
    throw new HttpNotFound('Exam ' + NOT_FOUND)
  }

  const key = 'KN'
  const examEntity = {
    title: inputs.title,
    identifier: key,
    categoryUUID: inputs.categoryUUID,
    description: inputs.description,
    marksPerQuestion: inputs.marksPerQuestion,
    totalQuestions: inputs.ExamQuestion.length
  }

  await exam.update(examEntity, { transaction })

  const examBanner = await ExamBanner.findOne({
    where: {
      examUUID: params.args.params.examUUID
    }
  })

  const bannerEntity = {
    url: inputs.banner
  }

  await examBanner.update(bannerEntity, { transaction })

  for (const obj of inputs.ExamCity) {
    const examCity = await ExamCity.findOne({
      where: {
        examUUID: params.args.params.examUUID,
        uuid: obj.uid
      }
    })
    const cityEntity = {
      cityUUID: obj.cityUUID
    }
    await examCity.update(cityEntity, { transaction })
  }

  for (const obj of inputs.ExamKeyword) {
    const examKeyword = await ExamKeyword.findOne({
      where: {
        examUUID: params.args.params.examUUID,
        uuid: obj.uuid
      }
    })
    const keywordEntity = {
      attribute: obj.attribute
    }
    await examKeyword.update(keywordEntity, { transaction })
  }

  for (const obj of inputs.ExamQuestion) {
    const examQuestion = await ExamQuestion.findOne({
      where: {
        examUUID: params.args.params.examUUID,
        uuid: obj.uuid
      }
    })
    const questionEntity = {
      questionUUID: obj.questionUUID
    }
    await examQuestion.update(questionEntity, { transaction })
  }

  await transaction.commit()
  return {
    message: SUCCESSFUL
  }
}
