import { FindOptions } from 'sequelize/types'
import { Category, Exam } from '../../../../shared/database/models'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { parseLimitOffsetFromRequest } from '../../../../shared/helpers/parseLimitOffsetFromRequest'

export const getAllMockTest = async (params: IControllerParams<{}>) => {
  const filterParams = params.args.queryString
  const queryParams: FindOptions = {
    include: [{
      model: Category,
      as: 'examCategory',
      attributes: ['uuid', 'label']
    }]
  }
  let where: any = {}
  if (filterParams.type) {
    where = {
      type: filterParams.type
    }
  }

  //   if (filterParams.categories) {
  //     where = {
  //       categoryUUID: (filterParams.categories).split(',')
  //     }
  //   }
  //   if (filterParams.q) {
  //     where = {
  //       [Op.or]: [
  //         { title: { [Op.like]: queryLikeString(filterParams.q) } },
  //         { '$examCategory.label$': { [Op.like]: queryLikeString(filterParams.q) } },
  //         { status: { [Op.like]: queryLikeString(filterParams.q) } }
  //       ]
  //     }
  //   }

  queryParams.where = where

  if (filterParams.limit) {
    const { limit, offset } = parseLimitOffsetFromRequest(filterParams as { limit: any, page: any })
    queryParams.limit = limit
    queryParams.offset = offset
  }

  const exams = await Exam.findAndCountAll(queryParams)

  const response = []

  for (const obj of exams.rows) {
    const exams = {
      uuid: obj.uuid,
      identifier: obj.identifier,
      title: obj.title,
      categoryName: obj.examCategory.label,
      totalQuestion: obj.totalQuestions,
      status: obj.status
    }

    response.push(exams)
  }

  return {
    message: SUCCESSFUL,
    payload: {
      response: response[0],
      count: exams.count
    }
  }
}
