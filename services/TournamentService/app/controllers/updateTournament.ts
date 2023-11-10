import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";
import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import {
  Tournament,
  TournamentBanner,
  TournamentCity,
  TournamentExamSchedule,
  TournamentKeyword,
  TournamentPriceRatio,
  TournamentRankingFactor,
} from "../../../../shared/database/models";
import { IUpdateTournament } from "../interfaces/IUpdateTournament";
import { HttpNotFound } from "../../../../shared/exceptions/HttpNotFound";
import { TOURNAMENT_NOT_FOUND } from "../../../../shared/constants/httpErrorMessages";

export const updateTournament = async (
  params: IControllerParams<IUpdateTournament>
) => {
  const inputs = params.input;
  const transaction = params.transaction;
  const tournamentUUID = params.args.params.tournamentUUID;
  const tournament = await Tournament.findByPk(tournamentUUID);
  if (!tournament)
    throw new HttpNotFound(TOURNAMENT_NOT_FOUND)

  await tournament.update(
    {
      title: inputs.title,
      categoryUUID: inputs.categoryUUID,
      studentLimit: inputs.studentLimit,
      isFree: inputs.isFree,
      joinFee: inputs.joinFee,
      isFeatured: inputs.isFeatured,
      winningPrice: inputs.winningPrice,
      webBanner: inputs.webBanner,
      phoneBanner: inputs.phoneBanner,
      allowPrimarySelection: inputs.allowPrimarySelection,
      allowSecondarySelection: inputs.allowSecondarySelection,
      description: inputs.description || '',
      joinDelay: inputs.joinDelay,
      marksPerQuestion: inputs.marksPerQuestion,
      timePerQuestion: inputs.timePerQuestion,
    },
    {
      include: [
        {
          model: TournamentBanner,
          as: "banner",
        }
      ],
      transaction,
    }
  );

  await Promise.all([
    TournamentCity.destroy({
      where: {
        uuid: tournamentUUID,
      },
      transaction,
    }),
    TournamentKeyword.destroy({
      where: {
        uuid: tournamentUUID,
      },
      transaction,
    }),
    TournamentExamSchedule.destroy({
      where: {
        tournamentUUID: tournamentUUID,
      },
      transaction,
    }),
    TournamentPriceRatio.destroy({
      where: {
        tournamentUUID
      },
      transaction,
    }),
    TournamentCity.destroy({
      where: {
        tournamentUUID,
      },
      transaction,
    }),
    TournamentKeyword.destroy({
      where: {
        tournamentUUID
      },
      transaction,
    }),
    TournamentRankingFactor.destroy({
      where: {
        tournamentUUID
      },
      transaction
    })
  ]);


  await Promise.all([TournamentCity.bulkCreate(inputs.tournamentCities.map(o => ({ tournamentUUID, cityUUID: o.uuid })),
    { transaction }
  ),
    TournamentKeyword.bulkCreate(inputs.tournamentKeywords.map(o => ({
      tournamentUUID,
    attribute: o.attribute,
  })),
    { transaction }
    ),
    TournamentExamSchedule.bulkCreate(inputs.tournamentExams.map(o => (
    {
      tournamentUUID,
      examUUID: o.examUUID,
      startTime: o.startTime,
      endTime: o.endTime,
      serialNo: o.serialNo
    })),
    { transaction }
    ),
    TournamentPriceRatio.bulkCreate(inputs.tournamentPrize.map(o => (
    {
      tournamentUUID,
      toValue: o.toValue,
      fromValue: o.fromValue ? o.fromValue : 0,
      amount: o.amount,
    })),
    { transaction }
    ),
    TournamentRankingFactor.bulkCreate(inputs.tournamentRankingFactor.map(o => ({
      tournamentUUID,
      type: o.type,
      title: o.title,
      time: o.time,
      points: o.point,
      coins: o.coins,
    })), { transaction })
  ])
  await transaction.commit();

  return {
    message: SUCCESSFUL,
  };
};
