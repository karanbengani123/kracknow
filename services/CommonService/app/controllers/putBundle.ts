import { IControllerParams } from '../../../../shared/interfaces/IControllerParams';
import { Bundle } from '../../../../shared/database/models';
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound';
import { IUpdateBundle } from '../interfaces/IUpdateBundle';
import { NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'

export const putBundle = async (params: IControllerParams<IUpdateBundle>) => {
  const inputs = params.input
  const transaction = params.transaction

  const bundle: any = await Bundle.findByPk(inputs.id)
  
  if (!bundle) {
    throw new HttpNotFound('Bundle' + NOT_FOUND)
  }

  await bundle.update({
    // bundle_name: inputs.bundle_name,
    amount_coins: inputs.amount_coins,
    amount_rupees: inputs.amount_rupees,
    status: inputs.status
  }, { transaction })

  await transaction.commit()

  return {
    message: 'Bundle is updated'
  }
}
