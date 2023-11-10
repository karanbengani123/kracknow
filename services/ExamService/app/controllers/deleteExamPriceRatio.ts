import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { ExamPriceRatio } from '../../../../shared/database/models'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'

export const deletePriceRatio = async (params: IControllerParams<{}>) => {
  const transaction = params.transaction
  const priceRatio = await ExamPriceRatio.findOne({
    where: {
      uuid: params.args.params.priceRatioUUID
    }
  })

  await priceRatio.destroy({ transaction })
  await transaction.commit()

  return {
    message: SUCCESSFUL
  }
}
