import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { Category, Exam, ExamSchedule } from '../../../../shared/database/models'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { FindOptions, Op } from 'sequelize'
import { queryLikeString } from '../../../../shared/helpers/string'
import { parseLimitOffsetFromRequest } from '../../../../shared/helpers/parseLimitOffsetFromRequest'
export const getExam = async (params: IControllerParams<{}>) => {
  const filterParams = params.args.queryString
  const queryParams: FindOptions = {
    include: [{
      model: Category,
      as: 'examCategory',
      attributes: ['uuid', 'label']
    }, {
      model: ExamSchedule,
      separate: true,
      as: 'schedule',
      attributes: ['startTime', 'endTime', 'createdAt']
    }],
    order: [['createdAt', 'DESC'], ['isFeatured', 'DESC'], ['updatedAt', 'DESC']]
  }

  let where: any = {

  }
  if (filterParams.type) {
    where['type'] = filterParams.type
  }

  if (filterParams.categories) {
    // eslint-disable-next-line dot-notation
    where['categoryUUID'] = (filterParams.categories).split(',')
  }

  if (filterParams.filter) {
    // eslint-disable-next-line dot-notation
    where['status'] = (filterParams.filter)
  }
  if (filterParams.q) {
    where = {
      [Op.or]: [
        { title: { [Op.like]: queryLikeString(filterParams.q) } },
        { '$examCategory.label$': { [Op.like]: queryLikeString(filterParams.q) } },
        { status: { [Op.like]: queryLikeString(filterParams.q) } }
      ]
    }
  }

  queryParams.where = where

  if (filterParams.limit) {
    const { limit, offset } = parseLimitOffsetFromRequest(filterParams as { limit: any, page: any })
    queryParams.limit = limit
    queryParams.offset = offset
  }

  const exams = await Exam.findAndCountAll(queryParams)

  const response = []
  for (const obj of exams.rows) {
    const schedule = await ExamSchedule.findAll({
      where: {
        examUUID: obj.uuid
      },
      order: [['createdAt', 'DESC']]
    })
    const exams = {
      uuid: obj.uuid,
      type:obj.type,
      identifier: obj.identifier,
      title: obj.title,
      categoryName: obj.examCategory ? obj.examCategory.label : null,
      startTime: schedule.length ? schedule[0].startTime : null,
      endTime: schedule.length ? schedule[0].endTime : null,
      totalQuestion: obj.totalQuestions,
      status: obj.status,
      isFeatured: obj.isFeatured
    }

    response.push(exams)
  }
  // const totalCount:any = count.rows[0]
  // console.log(count)
  return {
    message: SUCCESSFUL,
    payload: {
      response: response,
      count: exams.count
    }
  }
}
