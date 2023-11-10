import { publicEncrypt, constants } from 'crypto'

export const createCashfreeSignature = (publicKey: string, data: string) => {
  const encryptedData = publicEncrypt(
    {
      key: publicKey,
      padding: constants.RSA_PKCS1_OAEP_PADDING,
    },
    Buffer.from(data)
  )

  return encryptedData.toString('base64')
}