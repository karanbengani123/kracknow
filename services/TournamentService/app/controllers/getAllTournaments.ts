import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import {
  Category,
  Exam,
  Tournament,
  TournamentExamSchedule,
} from "../../../../shared/database/models";
import TournamentSchedule from "../../../../shared/database/models/TournamentSchedule";
import { parseLimitOffsetFromRequest } from "../../../../shared/helpers/parseLimitOffsetFromRequest";
import { queryLikeString } from "../../../../shared/helpers/string";
import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";
import { Op } from "sequelize"

export const getAllTournaments = async (params: IControllerParams<{}>) => {
  const filterParams = params.args.queryString;
  const where = {}

  if (filterParams.q) {
    where['title'] = { [Op.like]: queryLikeString(filterParams.q) };
  }

  const tournaments = await Tournament.findAndCountAll({
    where,
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['uuid', 'label']
      },
      {
        model: TournamentSchedule,
        as: "tournamentSchedule",
        order: [['createdAt', 'DESC']],
      },
      {
        model: TournamentExamSchedule,
        as: "tournamentExamSchedule",
        attributes: ["uuid", "createdAt"],
        include: [
          {
            model: Exam,
            as: "tournamentExamDetails",
            attributes: ["uuid"],
            include: [
              {
                model: Category,
                as: "examCategory",
                attributes: ["icon", "label"],
              },
            ],
          },
        ],
      },
    ],
    order: [['createdAt', 'DESC']],
    ...parseLimitOffsetFromRequest(filterParams as { limit: any; page: any })
  });
  if (tournaments) {
    const count = await Tournament.count({
      where
    })
    tournaments.count = count
  }

  return {
    message: SUCCESSFUL,
    payload: tournaments,
  };
};
