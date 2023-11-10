import {
  NOT_FOUND,
  TOURNAMENT_NOT_FOUND,
  TOURNAMENT_NOT_SCHEDULED,
} from "../../../../shared/constants/httpErrorMessages";
import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import {
  COMPLETED,
  EXAM_FEE,
  INBOUND,
  REGISTERED,
  SUCCESS,
  TOURNAMENT,
} from "../../../../shared/constants/message";
import {
  Tournament,
  TournamentParticipation,
  TournamentSchedule,
  Wallet,
  WalletTransaction,
} from "../../../../shared/database/models";
import { HttpNotFound } from "../../../../shared/exceptions/HttpNotFound";
import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";
import { v4 } from "uuid";
import * as moment from "moment";
import { HttpBadRequest } from "../../../../shared/exceptions/HttpBadRequest";

export const postTournamentUnRegister = async (params: IControllerParams<null>) => {
  let deleteStatus = false;
  const transaction = params.transaction;
  const datetime = moment().utc().format("YYYY:MM:DD, HH:mm");
  const tournamentSchedule = await TournamentSchedule.findByPk(params.args.params.tournamentScheduleUUID, {
    attributes: ["uuid", "tournamentUUID", "startTime", "endTime", "tournamentTime", "joined"],
    order: [['createdAt', 'DESC']],
  });
  if (!tournamentSchedule) {
    throw new HttpNotFound(TOURNAMENT_NOT_SCHEDULED);
  }
  const tournamentDetails = await Tournament.findByPk(tournamentSchedule.tournamentUUID, {
    attributes: ["uuid", "title", "studentLimit", "joinFee", "joined"],
  });
  if (!tournamentDetails) {
    throw new HttpNotFound(TOURNAMENT_NOT_FOUND);
  }

  if (tournamentSchedule.tournamentTime === "BASED_ON_TIME") {
    if (
      datetime >=
      moment(tournamentSchedule.startTime).utc().format("YYYY:MM:DD, HH:mm")
    ) {
      throw new HttpBadRequest(
        "Un-Registration is not possible at this moment because tournament is started"
      );
    }
  }
  deleteStatus = await TournamentParticipation.destroy(
    {
      where: {
        uuid: params.args.params.participationUUID,
        tournamentScheduleUUID: tournamentSchedule.uuid,
        tournamentUUID: tournamentDetails.uuid,
        studentUUID: params.user.id,
        status: REGISTERED
      },
      transaction
    },
  );

  const wallet = await Wallet.findOne({
    where: {
      studentUUID: params.user.id,
    },
  });

  if (wallet) {
    wallet.balance = wallet.balance + tournamentDetails.joinFee;
    await wallet.save({ transaction });
    await WalletTransaction.create(
      {
        examType: TOURNAMENT,
        examTitle: tournamentDetails.title,
        tournamentUUID: tournamentDetails.uuid,
        walletUUID: wallet.uuid,
        paymentMode: EXAM_FEE,
        orderId: v4().split("-")[4],
        referenceId: v4().split("-")[4],
        amount: tournamentDetails.joinFee,
        type: INBOUND,
        status: SUCCESS,
        paymentDate: new Date(),
      },
      { transaction }
    );
  }
  await tournamentSchedule.update({
    joined: tournamentSchedule.joined - 1,
    status: COMPLETED
  });
  await transaction.commit();
  return {
    message: deleteStatus ? SUCCESSFUL : NOT_FOUND
  };
};
