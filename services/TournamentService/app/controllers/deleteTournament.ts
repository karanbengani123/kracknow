import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";
import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import { Tournament } from "../../../../shared/database/models";
import { NOT_FOUND } from "../../../../shared/constants/httpErrorMessages";
import { Transaction } from "sequelize";

export const deleteTournament = async (params: IControllerParams<null>) => {
  const transaction: Transaction = params.transaction;
  const tournament = await Tournament.destroy({
    where: {
      uuid: params.args.params.tournamentUUID,
    },
    transaction,
  });

  await transaction.commit();
  return {
    message: tournament ? SUCCESSFUL : NOT_FOUND,
  };
};
