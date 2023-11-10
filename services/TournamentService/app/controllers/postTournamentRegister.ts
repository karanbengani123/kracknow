import {
  NOT_ENOUGH_MONEY,
  TOURNAMENT_ALREADY_REGISTERED,
  TOURNAMENT_NOT_FOUND,
  TOURNAMENT_NOT_SCHEDULED,
  TOURNAMENT_STUDENT_LIMIT_EXCEED,
} from "../../../../shared/constants/httpErrorMessages";
import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import {
  COMPLETED,
  OUTBOUND,
  REGISTERED,
  SUCCESS,
  TOURNAMENT,
  WALLET,
} from "../../../../shared/constants/message";
import {
  StudentCompletedTournamentExamsStatus,
  Tournament,
  TournamentExamSchedule,
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
import { IRegisterTournament } from "../interfaces/IRegisterTournament";

export const postTournamentRegister = async (params: IControllerParams<IRegisterTournament>) => {
  const transaction = params.transaction;
  const { primarySubcategory, secondarySubcategory, currentTime } = params.input;
  const datetime = moment().utc().format("YYYY:MM:DD, HH:mm");
  const dateday = moment().utc().format("YYYY:MM:DD");
  const tournamentSchedule = await TournamentSchedule.findByPk(params.args.params.tournamentScheduleUUID, {
    attributes: ["uuid", "tournamentUUID", "startTime", "endTime", "tournamentTime", "joined"],
    order: [['createdAt', 'DESC']],
  });
  if (!tournamentSchedule) {
    throw new HttpNotFound(TOURNAMENT_NOT_SCHEDULED);
  }
  const tournamentDetails = await Tournament.findByPk(tournamentSchedule.tournamentUUID, {
    include: [{
      model: TournamentExamSchedule,
      as: "tournamentExamSchedule",
    }],
    attributes: ["uuid", "title", "studentLimit", "joinFee", "joined"],

  });
  if (!tournamentDetails) {
    throw new HttpNotFound(TOURNAMENT_NOT_FOUND);
  }
  if (tournamentSchedule.joined === tournamentDetails.studentLimit) {
    throw new HttpNotFound(TOURNAMENT_STUDENT_LIMIT_EXCEED);
  }

  const participattion = await TournamentParticipation.findOne(
    {
      where: {
        tournamentScheduleUUID: tournamentSchedule.uuid,
        tournamentUUID: tournamentDetails.uuid,
        studentUUID: params.user.id,
      }
    },
  );
  if (participattion)
    throw new HttpBadRequest(TOURNAMENT_ALREADY_REGISTERED);

  if (tournamentSchedule.tournamentTime === "BASED_ON_TIME") {
    if (
      datetime >=
      moment(tournamentSchedule.startTime).utc().format("YYYY:MM:DD, HH:mm")
    ) {
      throw new HttpBadRequest(
        "Registration is not possible at this moment because registration time is completed"
      );
    }
  }
  else
    if (tournamentSchedule.tournamentTime === "FULL_DAY") {

      if (dateday > moment(tournamentSchedule.endTime).format("YYYY:MM:DD")) {
        throw new HttpBadRequest(
          "Registration is not possible at this moment because registration time is completed"
        );
      }
    }

  const wallet = await Wallet.findOne({
    where: {
      studentUUID: params.user.id,
    },
  });

  if (wallet) {
    if (tournamentDetails.joinFee > wallet.balance) {
      throw new HttpNotFound(NOT_ENOUGH_MONEY);
    }
    wallet.balance = wallet.balance - tournamentDetails.joinFee;
    await wallet.save({ transaction });
    await WalletTransaction.create(
      {
        examType: TOURNAMENT,
        examTitle: tournamentDetails.title,
        tournamentUUID: tournamentDetails.uuid,
        walletUUID: wallet.uuid,
        paymentMode: WALLET,
        orderId: v4().split("-")[4],
        referenceId: v4().split("-")[4],
        amount: tournamentDetails.joinFee,
        type: OUTBOUND,
        status: SUCCESS,
        paymentDate: new Date(),
      },
      { transaction }
    );
  }
  await tournamentSchedule.update({
    joined: tournamentSchedule.joined + 1,
    status: COMPLETED
  });

  const tournamentParticipation = await TournamentParticipation.create(
    {
      tournamentScheduleUUID: tournamentSchedule.uuid,
      tournamentUUID: tournamentDetails.uuid,
      studentUUID: params.user.id,
      status: REGISTERED,
      marks: 0,
      startedTime: currentTime,
      primarySubcategory,
      secondarySubcategory
    },
    { transaction }
  );
  if (tournamentParticipation) {
    const data: any[] = tournamentDetails.tournamentExamSchedule.map(o => ({
      examUUID: o.examUUID,
      tournamentParticipationUUID: tournamentParticipation.uuid
    }))
    await StudentCompletedTournamentExamsStatus.bulkCreate(data, { transaction })
  }

  await transaction.commit();

  return {
    message: SUCCESSFUL
  };
};
