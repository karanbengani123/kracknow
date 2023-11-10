import { SNS } from 'aws-sdk'
import { IDynamicObject } from '../../../interfaces/IDynamicObject'
import { logger } from '../../system/logger'

export const publishToTopic = (topic: string, payload: IDynamicObject, config?: IDynamicObject) => {
  const sns = new SNS(config || {})
  const topicArn = getTopicArn(topic)
  logger.debug('Publish Topic', { ARN: topicArn, payload })
  return sns.publish({
    Message: JSON.stringify(payload),
    TopicArn: topicArn
  }).promise()
}

const getTopicArn = (topic: string): string => {
  return ['arn:aws:sns', process.env.SNS_REGION, process.env.AWS_ACCOUNT_NUMBER, topic].join(':')
}
