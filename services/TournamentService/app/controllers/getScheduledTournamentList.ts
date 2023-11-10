import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import { Tournament, TournamentParticipation } from "../../../../shared/database/models";
import TournamentSchedule from "../../../../shared/database/models/TournamentSchedule";
import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";
import { COMPLETED, REGISTERED, SCHEDULED } from "../../../../shared/constants/message";
import { Op } from "sequelize"

export const getScheduledTournamentList = async (
  params: IControllerParams<null>
) => {
  const statusType: string = params.args.queryString.q;
  let participateWhere = {}
  const where = {
    endTime: { [Op.gt]: new Date() }
  }
  if (statusType === SCHEDULED) {
    participateWhere = {
      separate:false,
      where: {
        status: REGISTERED
      }
    }
  } else if (statusType === COMPLETED) {
    where["status"] = COMPLETED
    where['$tournamentParticipation.studentUUID$'] = params.user.id
    delete where.endTime
  }

  const scheduledTournament = await TournamentSchedule.findAll({
    include: [
      {
        model: Tournament,
        as: "tournament",
      },
      {
        model: TournamentParticipation,
        as: "tournamentParticipation",
        ...participateWhere,

      }
    ],
    where,
    order: [['startTime', 'DESC']]
  });

  return {
    message: SUCCESSFUL,
    payload: scheduledTournament
  }
};
