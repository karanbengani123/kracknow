import { randomBytes } from 'crypto'

export const generateToken = (length?: number) => {
  return randomBytes(length || 20).toString('hex')
}
