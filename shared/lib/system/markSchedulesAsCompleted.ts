import * as moment from 'moment'
import { ExamSchedule } from '../../database/models'

export const markSchedulesAsCompleted = async (transaction) => {
  const schedules = await ExamSchedule.findAll({
    where: {
      status: 'SCHEDULED'
    }
  })

  if (schedules.length) {
    for (const obj of schedules) {
      if (obj.examTime === 'FULL_DAY') {
        console.log(moment(obj.endTime).utc().format('YYYY:MM:DD'), '-------', moment().utc().format('YYYY:MM:DD, HH:mm:ss'))
        if (moment(obj.endTime).utc().format('YYYY:MM:DD') < moment().utc().format('YYYY:MM:DD')) {
          const schedule = await ExamSchedule.findOne({
            where: {
              uuid: obj.uuid
            }
          })

          if (schedule) {
            console.log('----------------------')
            await schedule.update({ status: 'COMPLETED' }, { transaction })
          }
        }
      } else if (obj.examTime === 'BASED_ON_TIME') {
        if (moment(obj.endTime).utc().format('YYYY:MM:DD, HH:mm:ss') < moment().utc().format('YYYY:MM:DD, HH:mm:ss')) {
          const schedule = await ExamSchedule.findOne({
            where: {
              uuid: obj.uuid
            }
          })

          if (schedule) {
            console.log('----------------------')
            await schedule.update({ status: 'COMPLETED' }, { transaction })
          }
        }
      }
    }
  }

  return transaction
}
