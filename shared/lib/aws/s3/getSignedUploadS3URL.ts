import { S3 } from 'aws-sdk'

export const s3 = new S3({
  apiVersion: 'latest',
  region: process.env.AWS_S3_REGION
})

export async function getSignedUploadS3URL(
  images,
  path: string,
  expiry: number = 100
) {
  console.log(images)
  
  try {
    const signedUrls = []
    for (const image of images) {
      const signedUrl = await s3.getSignedUrlPromise('putObject', {
        Bucket: process.env.AWS_S3_UPLOADS_BUCKET_NAME,
        Key: 'image_store' + '/' + path + image.fileName,
        ContentType: image.contentType,
        Expires: expiry
      })
      
      signedUrls.push(signedUrl)
    }

    return signedUrls
  } catch (error) {
    return error
  }
}
