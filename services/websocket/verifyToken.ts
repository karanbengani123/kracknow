import { verify } from 'jsonwebtoken'

export async function verifyToken (token) {
  return new Promise((resolve, reject) => {
    console.log(token, process.env.SHA256_PASSWORD_SALT)
    verify(token, process.env.SHA256_PASSWORD_SALT, (err, decoded) => {
      if (err) {
        return reject(err)
      }
      resolve(decoded)
    })
  })
}
