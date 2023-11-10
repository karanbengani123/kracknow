import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { Exam, ExamSchedule } from '../../../../shared/database/models'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'
import { IScheduleExam } from '../interfaces/IScheduleExam'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import * as moment from 'moment-timezone'
import { EventBridge, config } from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid'
import { prepareMessageFromTemplate } from '../../../../shared/helpers/prepareMessageFromTemplate'

config.update({ region: process.env.AWS_S3_REGION })
const eventBridge = new EventBridge({ apiVersion: '2015-10-07' })

export const scheduleExam = async (
  params: IControllerParams<IScheduleExam>
) => {
  const inputs = params.input
  const transaction = params.transaction

  const exam = await Exam.findOne({
    where: {
      uuid: params.args.params.examUUID
    },
    transaction
  })

  if (!exam) {
    throw new HttpNotFound('Exam ' + NOT_FOUND)
  }

  await exam.update({ status: 'SCHEDULED' }, { transaction })
  const sTime = moment.tz(inputs.startTime, inputs.timeZone).utc()
  const eTime = moment.tz(inputs.endTime, inputs.timeZone).utc()
  const schedule = await ExamSchedule.create({
    startTime: sTime.toString(),
    endTime: eTime.toString(),
    examUUID: exam.uuid,
    examTime: inputs.examTime
  }, { transaction })

  const genRuleName = (type: string) => `exam-reminder-${type}-${uuidv4()}`
  const id = uuidv4()
  // Schedule an event to send the notification before x time
  const eventBridgestartTimeExpression = sTime
    .subtract(parseInt(process.env.REMINDER_TIME_BEFORE_START_EXAM), 'minutes')
    .format('m H D M ? YYYY')
  const ruleNameStart = genRuleName('start')

  await eventBridge
    .putRule({
      Name: ruleNameStart,
      ScheduleExpression: `cron(${eventBridgestartTimeExpression})`,
      State: 'ENABLED'
    })
    .promise()
  console.log("arn**********", process.env.REMINDER_LAMBDA_ARN);
  const targets = await eventBridge
    .putTargets({
      Rule: ruleNameStart,
      Targets: [
        {
          Arn: `arn:aws:lambda:${process.env.REMINDER_LAMBDA_ARN}`,
          Id: id,
          Input: JSON.stringify({
            message: prepareMessageFromTemplate(
              process.env.REMINDER_EXAM_START_TMP,
              {
                type: exam.type,
                exam: exam.title,
                time: process.env.REMINDER_TIME_BEFORE_START_EXAM
              }
            ),
            eventType: 'startTime',
            ruleName: ruleNameStart,
            targetId: id,
            examSCheduleUUID: schedule.uuid
          })
        }
      ]
    })
    .promise()

  console.log(targets.$response, '---------------------')
  // Schedule an event to send the notification on exam completion
  const eventBridgeendTimeExpression = eTime.format('m H D M ? YYYY')
  const ruleNameEnd = genRuleName('end')

  await eventBridge
    .putRule({
      Name: ruleNameEnd,
      ScheduleExpression: `cron(${eventBridgeendTimeExpression})`,
      State: 'ENABLED'
    })
    .promise()

  await eventBridge
    .putTargets({
      Rule: ruleNameEnd,
      Targets: [
        {
          Arn: `arn:aws:lambda:${process.env.REMINDER_LAMBDA_ARN}`,
          Id: id,
          Input: JSON.stringify({
            message: prepareMessageFromTemplate(
              process.env.REMINDER_EXAM_COMPLETED_TMP,
              {
                type: exam.type,
                exam: exam.title
              }
            ),
            eventType: 'endTime',
            ruleName: ruleNameEnd,
            targetId: id,
            examSCheduleUUID: schedule.uuid,
            examType: inputs.type
          })
        }
      ]
    })
    .promise()

  await transaction.commit()
  return {
    message: SUCCESSFUL
  }
}
