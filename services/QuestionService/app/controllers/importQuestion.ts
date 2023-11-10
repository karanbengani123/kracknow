import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { s3 } from '../../../../shared/lib/aws/s3/getSignedUploadS3URL'
import { IImportQuestion } from '../interfaces/IImportQuestion'
import { Question, QuestionOption } from '../../../../shared/database/models'
import xlsx from 'node-xlsx'
const csv = require('@fast-csv/parse')
export const importQuestion = async (
  params: IControllerParams<IImportQuestion>
) => {
  let entity = []
  const fetchedData = []

  const param = {
    Bucket: process.env.AWS_S3_UPLOADS_BUCKET_NAME,
    Key: 'image_store' + '/' + '/' + 'Superadmin' + '/' + params.input.fileName
  }

  const file = await s3.getObject(param).createReadStream()
  const fileName = params.input.fileName.split('.')
  if (fileName[1] === 'csv') {
    await new Promise((resolve, reject) => {
      const parser = csv.parseStream(file, { headers: true })

      parser.on('data', async function (datas) {
        fetchedData.push(datas)
      })

      parser.on('end', async function () {
        entity = fetchedData.map((each) => {
          return {
            categoryUUID: params.input.categoryUUID,
            subCategoryUUID: params.input.subCategoryUUID,
            title: each.question_title,
            status: true,
            options: [
              {
                key: 'A',
                isCorrect: each.Answer === 'A' ? true : false,
                text: each.A,
                image: each.image_a
              },
              {
                key: 'B',
                isCorrect: each.Answer === 'B' ? true : false,
                text: each.B,
                image: each.image_b
              },
              {
                key: 'C',
                isCorrect: each.Answer === 'C' ? true : false,
                text: each.C,
                image: each.image_c
              },
              {
                key: 'D',
                isCorrect: each.Answer === 'D' ? true : false,
                text: each.D,
                image: each.image_d
              }
            ]
          }
        })

        await Question.bulkCreate(entity, {
          include: [
            {
              model: QuestionOption,
              as: 'options'
            }
          ]
        })
        resolve('csv parse process finished')
      })
      parser.on('error', function () {
        reject('csv parse process failed')
      })
    })
  } else {
    await new Promise((resolve, reject) => {
      file.on('data', async (data) => {
        fetchedData.push(data)
      })

      file.on('end', async () => {
        const buffer = Buffer.concat(fetchedData)
        const value = xlsx.parse(buffer)
        const question: any = value[0].data[0]
        const questionData = []
        value[0].data.slice(1).map((option: string[]) => {
          const tempObj = {
            question_title: null,
            A: null,
            B: null,
            C: null,
            D: null,
            image_a: null,
            image_b: null,
            image_c: null,
            image_d: null,
            Answer: null
          }
          question.map((quest) => {
            tempObj[`${quest}`] = ''
          })
          option.map((value: string, index: number) => {
            tempObj[`${question[index]}`] = value
          })
          questionData.push(tempObj)
        })

        // console.log(questionData)
        entity = questionData.map((each) => {
          return {
            categoryUUID: params.input.categoryUUID,
            subCategoryUUID: params.input.subCategoryUUID,
            title: each.question_title,
            status: true,
            options: [
              {
                key: 'A',
                isCorrect:
                  each.Answer === 'A' || each.Answer === 'a' ? true : false,
                text: each.A,
                image: each.image_a
              },
              {
                key: 'B',
                isCorrect:
                  each.Answer === 'B' || each.Answer === 'b' ? true : false,
                text: each.B,
                image: each.image_b
              },
              {
                key: 'C',
                isCorrect:
                  each.Answer === 'C' || each.Answer === 'c' ? true : false,
                text: each.C,
                image: each.image_c
              },
              {
                key: 'D',
                isCorrect:
                  each.Answer === 'D' || each.Answer === 'd' ? true : false,
                text: each.D,
                image: each.image_d
              }
            ]
          }
        })

        await Question.bulkCreate(entity, {
          include: [
            {
              model: QuestionOption,
              as: 'options'
            }
          ]
        })
        resolve('xlsx parse process finished')
      })
      file.on('error', function () {
        reject('xlsx parse process failed')
      })
    })
  }

  return {
    message: SUCCESSFUL,
    payload: {}
  }
}
