import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import {
  Exam,
  ExamPriceRatio,
  ScheduleExamParticipation,
} from '../../../../shared/database/models'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { Op } from 'sequelize'

export const postDistributeMoney = async (params: IControllerParams<null>) => {
  const exam = await Exam.findByPk(params.args.params.examUUID, {
    include: [
      {
        model: ExamPriceRatio,
        as: 'examprice',
        where: {
          amount: { [Op.gt]: 0 },
        },
        attributes: ['examUUID', 'fromValue', 'toValue', 'amount'],
      },
      {
        model: ScheduleExamParticipation,
        as: 'ScheduleExamParticipation',
      },
    ],
  })

  return {
    message: SUCCESSFUL,
    payload: exam,
  }
}
