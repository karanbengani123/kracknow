import { createHash } from 'crypto'
import { logger } from '../lib/system/logger'

/**
 * generate a salted sha256 string.
 * @param key
 * @param salt
 */
export const generateSha256Password = (key: string, salt?: string): string => {
  const secret: string = salt || process.env.SHA256_PASSWORD_SALT
  return createHash('sha256').update(key + secret).digest('hex')
}

/**
 * generate a sha256 string.
 * @param key
 * @param salt
 */
export const generateSha256Hash = (key: string): string => {
  return createHash('sha256').update(key).digest('hex')
}

export function makeRandomString (length: number = 50) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  logger.debug('make random string', { res: [result, Math.floor(Math.random() * 1000000)].join('') })
  return [result, Math.floor(Math.random() * 1000000)].join('')
}
