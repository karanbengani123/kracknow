
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import {
    TournamentPriceDistribution,
    TournamentSchedule,
    TournamentScheduledExam,
} from "../../../../shared/database/models";
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'

export const getTournamentScheduledList = async (params: IControllerParams<null>) => {
    const tournamentScheduleDetails = await TournamentSchedule.findAll({
        where: {
            tournamentUUID: params.args.params.tournamentUUID,
        },
        include: [{
            model: TournamentScheduledExam,
            as: "tournamentSchedule_TournamentScheduledExam"
        }, {
            model: TournamentPriceDistribution,
            as: "tournamentPriceDistribution",
            order: [['rank', 'ASC']]
            }
        ],
        order: [['createdAt', 'DESC']]
    })

    return {
        message: SUCCESSFUL,
        payload: {
            response: tournamentScheduleDetails
        }
    }
}
