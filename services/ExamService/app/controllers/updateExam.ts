import { NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import {
  Exam,
  ExamBanner,
  ExamCity,
  ExamKeyword,
  ExamPriceRatio,
  ExamQuestion,
  ExamRankingFactor
} from '../../../../shared/database/models'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { isDefined } from '../../../../shared/helpers/isDefined'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { IUpdateExam } from '../interfaces/IUpdateExam'

export const updateExam = async (params: IControllerParams<IUpdateExam>) => {
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
    allowPrimarySelection: inputs.allowPrimarySelection,
    allowSecondarySelection: inputs.allowSecondarySelection,
    isFeatured: inputs.isFeatured,
    marksPerQuestion: inputs.marksPerQuestion,
    totalQuestions: inputs.ExamQuestion.length,
    studentLimit: inputs.studentLimit,
    isFree: inputs.isFree,
    joinFee: inputs.joinFee,
    type: inputs.type,
    joinDelay: inputs.joinDelay,
    totalWinningPrize: inputs.totalWinningPrize,
    timePerQuestion: inputs.timePerQuestion
  }

  if (isDefined(inputs.description)) {
    // eslint-disable-next-line dot-notation
    examEntity['description'] = inputs.description
  }
  await exam.update(examEntity, { transaction })

  await ExamBanner.destroy({
    where: {
      examUUID: exam.uuid
    }
  })

  const bannerEntity = {
    examUUID: exam.uuid,
    url: inputs.webBanner,
    phoneBanner: inputs.phoneBanner
  }
  await ExamBanner.create(bannerEntity, { transaction })

  await ExamCity.destroy({
    where: {
      examUUID: exam.uuid
    }
  })
  for (const obj of inputs.ExamCity) {
    const cityEntity = {
      examUUID: exam.uuid,
      cityUUID: obj.uuid
    }
    await ExamCity.create(cityEntity, { transaction })
  }

  await ExamKeyword.destroy({
    where: {
      examUUID: params.args.params.examUUID
    }
  })

  for (const obj of inputs.ExamKeyword) {
    const keyWordEntity = {
      examUUID: exam.uuid,
      attribute: obj.attribute
    }
    await ExamKeyword.create(keyWordEntity, { transaction })
  }

  await ExamQuestion.destroy({
    where: {
      examUUID: params.args.params.examUUID
    }
  })

  for (const obj of inputs.ExamQuestion) {
    const questionEntity = {
      examUUID: exam.uuid,
      questionUUID: obj.questionUUID
    }
    await ExamQuestion.create(questionEntity, { transaction })
  }

  await ExamPriceRatio.destroy({
    where: {
      examUUID: params.args.params.examUUID
    }
  })

  for (const obj of inputs.ExamPrice) {
    const priceEntity = {
      examUUID: exam.uuid,
      toValue: obj.toValue,
      fromValue: obj.fromValue ? obj.fromValue : 0,
      amount: obj.price
    }
    await ExamPriceRatio.create(priceEntity, { transaction })
  }

  await ExamRankingFactor.destroy({
    where: {
      examUUID: params.args.params.examUUID
    }
  })

  for (const obj of inputs.ExamRankingFactor) {
    const rankingEntity = {
      examUUID: exam.uuid,
      type: obj.type,
      title: obj.title,
      time: obj.time,
      points: obj.point,
      coins: obj.coins
    }
    await ExamRankingFactor.create(rankingEntity, { transaction })
  }

  await transaction.commit()
  return {
    message: SUCCESSFUL,
    payload: {}
  }
}
