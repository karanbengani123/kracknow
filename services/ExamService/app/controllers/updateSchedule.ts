import * as moment from 'moment'
import { NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { ExamSchedule } from '../../../../shared/database/models'
import { HttpBadRequest } from '../../../../shared/exceptions/HttpBadRequest'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { IUpdateSchedule } from '../interfaces/IUpdateSchedule'

export const updateSchedule = async (params: IControllerParams<IUpdateSchedule>) => {
  const inputs = params.input
  const transaction = params.transaction
  const schedule = await ExamSchedule.findOne({
    where: {
      uuid: params.args.params.scheduleUUID
    }
  }) 

  if (!schedule) {
    throw new HttpNotFound('Schedule' + NOT_FOUND)
  }

  if (schedule.startTime >= moment().utcOffset('+05:30').format()) {
    throw new HttpBadRequest('Cannot Change the Schedule Time')
  }
  console.log(inputs.startTime)
  const scheduleUpdateEntity = {
    startTime: inputs.startTime,
    endTime: inputs.endTime,
    examTime: inputs.examTime
  }

  await schedule.update(scheduleUpdateEntity, { transaction })
  await transaction.commit()

  return {
    message: SUCCESSFUL
  }
}
