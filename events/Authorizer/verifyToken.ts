import { verify } from 'jsonwebtoken'
import { ITokenData } from './interfaces/ITokenData'

export const verifyToken = (token: string): Promise<ITokenData> => {
  return new Promise((resolve, reject) => {
    verify(token, process.env.SHA256_PASSWORD_SALT, (err: Error, decoded: any) => {
      if (err) {
        reject(err)
      } else {
        resolve(decoded)
      }
    })
  })
}
