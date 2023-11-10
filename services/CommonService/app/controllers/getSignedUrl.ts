/* eslint-disable node/no-deprecated-api */
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { makeRandomString } from '../../../../shared/helpers/generateSha256Password'
import { getSignedUploadS3URL } from '../../../../shared/lib/aws/s3/getSignedUploadS3URL'
import { IGetSignedUrl } from '../interfaces/IGetSignedUrl'
import * as url from 'url'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'

export const getSignedUrl = async (params: IControllerParams<IGetSignedUrl>) => {
  const inputs = params.input

  const files = inputs.files.map((image) => {
    const generatedKey = makeRandomString(50)
    const fileName = image.fileName ? image.fileName : [generatedKey, image.extension].join('.')
    return {
      fileName,
      contentType: image.contentType
    }
  })

  const path = '/' + inputs.for + '/'
  const signedUrls = await getSignedUploadS3URL(files, path)

  return {
    message: SUCCESSFUL,
    payload: {
      signedUrls: signedUrls?.map((signedUrl) => {
        const parsedUrl = url.parse(signedUrl, true)
        return {
          signedUrl,
          fileUrl: signedUrl.replace(parsedUrl.search, '')
        }
      })
    }
  }
}


