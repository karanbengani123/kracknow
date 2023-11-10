import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import {
  Tournament,
  TournamentBanner,
  TournamentCity,
  TournamentExamSchedule,
  TournamentKeyword,
  TournamentPriceRatio,
} from "../../../../shared/database/models";
import TournamentRankingFactor from "../../../../shared/database/models/TournamentRankingFactor";
import { UniqueIDGenerator } from "../../../../shared/helpers/uniqueIdGeneration";
import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";
import { ICreateTournament } from "../interfaces/ICreateTournament";

export const addTournament = async (
  params: IControllerParams<ICreateTournament>
) => {
  const inputs = params.input;
  const transaction = params.transaction;


  let id = '00000'

  const tournament = await Tournament.findOne({
    where: {
      isLastRecord: true
    }
  })

  if (tournament) {
    id = tournament.identifier
  }
  
  const tournamentEntity = {
    title: inputs.title,
    identifier: UniqueIDGenerator.getInstance.tournamentGenerateID('KNTM', id),
    categoryUUID: inputs.categoryUUID,
    allowPrimarySelection: inputs.allowPrimarySelection || false,
    allowSecondarySelection: inputs.allowSecondarySelection || false,
    description: inputs.description || '',
    studentLimit: inputs.studentLimit,
    isFree: inputs.isFree,
    joinFee: inputs.joinFee,
    isFeatured: inputs.isFeatured,
    winningPrice: inputs.winningPrice,
    webBanner: inputs.webBanner,
    phoneBanner: inputs.phoneBanner,
    isLastRecord: true,
    joinDelay: inputs.joinDelay,
    marksPerQuestion: inputs.marksPerQuestion,
    timePerQuestion: inputs.timePerQuestion,
    tournamentCities: inputs.tournamentCities.map((item) => ({
      cityUUID: item.uuid,
    })),
    tournamentKeywords: inputs.tournamentKeywords.map((item) => ({
      attribute: item.attribute,
    })),
    tournamentExamSchedule: inputs.tournamentExams.map((item) => ({
      examUUID: item.examUUID,
      serialNo: item.serialNo,
    })),
    tournamentPrize: inputs.tournamentPrize.map((item) => ({
      toValue: item.toValue,
      fromValue: item.fromValue ? item.fromValue : 0,
      amount: item.amount, 
    })),
    tournamentRankingFactor: inputs.tournamentRankingFactor.map((item) => ({
      type: item.type,
      title: item.title,
      time: item.time,
      points: item.point,
      coins: item.coins,
    })),
  };
  await Tournament.create(tournamentEntity, {
    include: [
      {
        model: TournamentCity,
        as: "tournamentCities",
      },
      {
        model: TournamentKeyword,
        as: "tournamentKeywords",
      },
      {
        model: TournamentExamSchedule,
        as: "tournamentExamSchedule",
      },
      {
        model: TournamentPriceRatio,
        as: "tournamentPrize",
      },
      {
        model: TournamentBanner,
        as: "banner",
      },
      {
        model: TournamentRankingFactor,
        as: "tournamentRankingFactor",
      },
    ],
    transaction,
  });

  if (tournament)
    await tournament.update({
      isLastRecord: false
    })

  await transaction.commit();
  return {
    message: SUCCESSFUL,
  };
};
