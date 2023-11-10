
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { Wallet, WalletTransaction } from '../../../../shared/database/models'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import  { QueryTypes } from "sequelize";
import { instance } from '../../../../shared/database/sequelize';
import { SUCCESS } from '../../../../shared/constants/message';
import { parseLimitOffsetFromRequest } from '../../../../shared/helpers/parseLimitOffsetFromRequest';

export const getTransactionHistoryByWalletUUID = async (
  params: IControllerParams<null>
) => {
  const walletUUID=params.args.params.walletUUID
  const wallet = await Wallet.findOne({ 
      where: {
          uuid: walletUUID,
      },
      attributes: {
          exclude: [
              "studentUUID",
              "balance",
              "uuid",
              "createdAt",
              "updatedAt",
              "deletedAt",
          ],
      },
      include: [
          {
              model: WalletTransaction,
              as: "wallettransaction",
              attributes: {
                  exclude: ["walletUUID", "uuid", "createdAt", "deletedAt"],
              },
              order: [["updatedAt", "DESC"]],
          },
      ],
      order: [
          [
              { model: WalletTransaction, as: "wallettransaction" },
              "createdAt",
              "DESC",
          ],
      ],
      ...parseLimitOffsetFromRequest(
          params.args.queryString as { limit: any; page: any }
      ),
  });
  
  const rawQuery= "select sum(amount) as ? from wallet_transactions where  status=? and walletUUID=? and type=?"
    const totalInbound=await instance.connection.query(rawQuery
       ,
        {
            replacements: ["totalInbound",SUCCESS,walletUUID, "INBOUND"],
            type: QueryTypes.SELECT,
        }
    )
    const totalOutbound = await instance.connection.query(rawQuery, {
        replacements: ["totalOutbound",SUCCESS,walletUUID, "OUTBOUND"],
        type: QueryTypes.SELECT,
    });

  return {
    message: SUCCESSFUL,
    payload: {wallet,totalInbound,totalOutbound},
  }
}
