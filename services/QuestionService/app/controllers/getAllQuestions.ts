/* eslint-disable no-unused-vars */

import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { FindOptions, Op } from 'sequelize'
import { Category, Question, QuestionOption, SubCategory } from '../../../../shared/database/models'
// import { queryLikeString } from '../../../../shared/helpers/string'
import { parseLimitOffsetFromRequest } from '../../../../shared/helpers/parseLimitOffsetFromRequest'
import { queryLikeString } from '../../../../shared/helpers/string'
import moment from 'moment'

export const getAllQuestions = async (params: IControllerParams<null>) => {
  const filterParams = params.args.queryString

  const queryParams: FindOptions = {
    include: [{
      model: Category,
      as: 'questionCategory',
      attributes: ['uuid', 'label']
    },
    {
      model: QuestionOption,
      as: 'options'
    },
    {
      model: SubCategory,
      as: 'questionSubCategory',
      attributes: ['uuid', 'label']
    }
    ]
  }
  queryParams.order = [['createdAt', 'DESC'], ['options', 'key', 'ASC']]
  let where: any = {}

  if (filterParams.q) {
    // Query three tables and get id list
    const categoryParams: any = {
      label: {
        [Op.like]: queryLikeString(filterParams.q)
      }
    }

    const newCategoryList = await Category.findAll({
      where: categoryParams
    })
    let categoryUUID = []
    if (newCategoryList.length) {
      categoryUUID = newCategoryList.map(each => each.uuid)
      // eslint-disable-next-line dot-notation
      if (filterParams.category) {
        // eslint-disable-next-line dot-notation
        categoryUUID.push(filterParams.category)
      }
    }

    const subcategoryParams: any = {
      label: {
        [Op.like]: queryLikeString(filterParams.q)
      }
    }

    const newSubCategoryList = await SubCategory.findAll({
      where: subcategoryParams
    })
    let subCategoryUUID = []
    if (newSubCategoryList.length) {
      subCategoryUUID = newSubCategoryList.map(each => each.uuid)

      // eslint-disable-next-line dot-notation
    }

    if (filterParams.subCategory) {
      // eslint-disable-next-line dot-notation
      subCategoryUUID.push(filterParams.subCategory)
    }

    const question: any = {
      title: {
        [Op.like]: queryLikeString(filterParams.q)
      }
    }

    const questionList = await Question.findAll({
      where: question,
      order: [['createdAt', 'DESC']]
    })
    let questionUUID = []
    if (questionList.length) {
      questionUUID = newSubCategoryList.map(each => each.uuid)
      // eslint-disable-next-line dot-notation
    }

    where = {
      [Op.or]: [{
        categoryUUID: { [Op.in]: categoryUUID }
      }, {
        subCategoryUUID: { [Op.in]: subCategoryUUID }
      }, {
        uuid: { [Op.in]: questionUUID }
      }]
    }

    console.log(categoryUUID, subCategoryUUID, questionUUID)
  } else {
    if (filterParams.category) {
      // eslint-disable-next-line dot-notation
      where['categoryUUID'] = filterParams.category
    }

    if (filterParams.subCategory) {
      // eslint-disable-next-line dot-notation
      where['subCategoryUUID'] = filterParams.subCategory
    }

    if (filterParams.startDate) {
      // eslint-disable-next-line dot-notation
      where['createdAt'] = { [Op.between]: [filterParams.startDate, filterParams.endDate ? filterParams : moment().toDate()] }
    }

    if (filterParams.usageCount) {
      // eslint-disable-next-line dot-notation
      where['appearedExamCount'] = { [Op.lt]: filterParams.usageCount }
    }
  }

  queryParams.where = where
  console.log(queryParams.where, '================================')
  if (filterParams.limit) {
    const { limit, offset } = parseLimitOffsetFromRequest(filterParams as { limit: any, page: any })
    queryParams.limit = limit
    queryParams.offset = offset
  }

  const questionResult = await Question.findAndCountAll(queryParams)

  const count = questionResult.count / 4

  return {
    payload: { list: questionResult.rows, count: count }
  }
}