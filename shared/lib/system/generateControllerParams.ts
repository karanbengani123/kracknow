import { Transaction } from 'sequelize'
import { instance } from '../../database/sequelize'

/**
 * Generate controller injectable properties such as transaction and translator
 * @param req
 * @returns
 */
export const getTransaction = async (): Promise<Transaction> => {
  return await instance.connection.transaction()
}

/* export const selectLanguage = (req: Request): void => {
  req.i18n.changeLanguage(req.language)
}

export const getTranslator = (req: Request): i18next.TFunction => {
  return req.t
} */
