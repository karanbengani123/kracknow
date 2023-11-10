import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages';
import { Wallet, WalletTransaction } from '../../../../shared/database/models';
import { parseLimitOffsetFromRequest } from '../../../../shared/helpers/parseLimitOffsetFromRequest';
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams';

export const getTransactionHistory = async (
  params: IControllerParams<null>
) => {
  try{

    var wallet = await Wallet.findAndCountAll({
      where: {
        studentUUID: params.user.id,
      },
      attributes: [
        'uuid',   
      ],
    });
  
    const { limit, offset } = parseLimitOffsetFromRequest(
      params.args.queryString as { limit: any; page: any }
    );
  
    // console.log(wallet)
    var wallettransaction = await WalletTransaction.findAndCountAll({
      where: {
        walletUUID: wallet.uuid,
      },
      attributes: {
        exclude: ['walletUUID', 'uuid', 'deletedAt'],
      },
      order: [
        [
          'createdAt',
          'DESC',
        ],
      ],
      limit,
      offset,
    });
  }catch (error) {
    console.log(error)
  }

  return {
    message: SUCCESSFUL,
    payload: { wallettransaction ,wallet},
  };
};
