import { NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import {
  Category,
  City,
  Exam,
  Tournament,
  TournamentCity,
  TournamentExamSchedule,
  TournamentKeyword,
  TournamentPriceDistribution,
  TournamentPriceRatio,
  TournamentRankingFactor,
  TournamentScheduledExam,
} from "../../../../shared/database/models";
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'

export const getTournamentDetails = async (params: IControllerParams<null>) => {
  TournamentPriceDistribution
  const tournamentDetails = await Tournament.findOne({
    where: {
      uuid: params.args.params.tournamentUUID,
    },
    include: [{
      model: Category,
      as: 'category',
      attributes: ['uuid', 'label']
    },
    {
      model: TournamentCity,
      as: "tournamentCities",
      include: [
        {
          model: City,
          as: "citiesTournament",
          attributes: ["city", "uuid"],
        },
      ],
    },
    {
      model: TournamentKeyword,
      as: "tournamentKeywords",
    },
    {
      model: TournamentRankingFactor,
      as: "tournamentRankingFactor",
    },
    {
      model: TournamentExamSchedule,
      as: "tournamentExamSchedule",
      attributes: ['uuid', 'examUUID', 'serialNo'],
      include: [
        {
          model: Exam,
          as: "tournamentExamDetails",
          attributes: ["uuid", "title"],
          include: [
            {
              model: TournamentScheduledExam,
              as: "exam_TournamentScheduledExam",
              order: [['createdAt', 'DESC']],
              limit: 1
            }
          ]
        },
      ],
    },
    {
      model: TournamentPriceRatio,
      as: "tournamentPrize",
    }
    ],
    order: [["tournamentPrize", "toValue", "ASC"]],
  });

  if (!tournamentDetails) {
    throw new HttpNotFound('Tournament ' + NOT_FOUND)
  }
  return {
    message: SUCCESSFUL,
    payload: {
      response: tournamentDetails
    }
  }
}
