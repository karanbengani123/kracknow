import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { ExamRankingFactor } from '../../../../shared/database/models'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'

export const deleteRankingFactor = async (params: IControllerParams<{}>) => {
  const transaction = params.transaction
  const rankingFactor = await ExamRankingFactor.findOne({
    where: {
      uuid: params.args.params.rankingFactorUUID
    }
  })

  await rankingFactor.destroy({ transaction })
  await transaction.commit()

  return {
    message: SUCCESSFUL
  }
}
