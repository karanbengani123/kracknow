import { S3 } from 'aws-sdk'

const s3 = new S3()

export async function signedUploadLink (key: string, expiry: number = 60) {
  return s3.getSignedUrl('getObject', {
    Bucket: process.env.AWS_BUCKET_NAME,
    Expires: expiry,
    Key: key
  })
}
