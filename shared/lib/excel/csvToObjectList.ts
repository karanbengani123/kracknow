/* eslint-disable use-isnan */
import { S3 } from 'aws-sdk'
import * as csv from 'csv-streamify'
import { logger } from '../system/logger'

export const s3CSVToObjectList = (file: string, bucket: string, keyIndexMap: { [k: string]: { index: number, type: string, removeEmpty?: boolean } }, skipFirstLine = false): Promise<Array<any>> => {
  return new Promise((resolve, reject) => {
    try {
      const s3 = new S3({
        apiVersion: '2006-03-01',
        region: 'ap-south-1'
      })

      const parser = csv()

      const result = []

      let lineNumber = 0
      parser.on('data', (line: string[]) => {
        if (lineNumber === 0 && skipFirstLine) {
          lineNumber++
          return
        }

        const obj: any = {}

        for (const key in keyIndexMap) {
          const value = getItemByKey(key, line, keyIndexMap)

          if (value !== 0 && !value && keyIndexMap[key].removeEmpty === true) {
            continue
          }
          obj[key] = value
        }

        result.push(obj)

        lineNumber++
      })

      parser.on('end', () => {
        parser.destroy()
        resolve(result)
      })

      s3.getObject({
        Bucket: bucket,
        Key: file
      }).createReadStream().pipe(parser)
    } catch (e) {
      reject(e)
    }
  })
}

const getItemByKey = (key: string, list: string[], colounIndexMap) => {
  const meta = colounIndexMap[key]
  const value = list[meta.index]
  const trimmedValue = value ? value.trim() : value
  if (meta.type === 'stringArray') {
    logger.debug('stringArray', { trimmedValue })
    if (trimmedValue === '') {
      return ''
    }
    return value.split('\n').map(item => item.trim()).filter(item => !!item)
  }
  if (meta.type === 'number') {
    if (parseInt(trimmedValue) === NaN) {
      return ''
    } else {
      return parseInt(trimmedValue)
    }
  }
  return value ? value.trim() : ''
}
