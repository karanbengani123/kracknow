import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import {
  Tournament,
  TournamentParticipation,
} from "../../../../shared/database/models";
import TournamentSchedule from "../../../../shared/database/models/TournamentSchedule";
import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";

export const getRegisteredTournamentList = async (
  params: IControllerParams<null>
) => {
  const registeredTournament = await TournamentParticipation.findAll({
    where: {
      studentUUID: params.user.id,
    },
    include: [
      {
        model: Tournament,
        as: "tournament",
        include: [
          {
            model: TournamentSchedule,
            as: "tournamentSchedule",
          },
        ],
      },
    ],
  });

  return {
    message: SUCCESSFUL,
    payload: registeredTournament,
  };
};
