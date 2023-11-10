
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { TournamentExamParticipationQuestion, TournamentExamParticipationQuestionOption } from '../../../../shared/database/models'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'

export const getExamDetails = async (params: IControllerParams<null>) => {
  const tournamentExamDetails = await TournamentExamParticipationQuestion.findAll({
    where: {
      tournamentParticipationUUID: params.args.params.tournamentParticipationUUID,
      examUUID: params.args.params.examUUID
    },
    include: [
      {
        model: TournamentExamParticipationQuestionOption,
        as: "tournamentExamParticipationQuestionOption",
      }
    ]
  })

  return {
    message: SUCCESSFUL,
    payload: {
      response: tournamentExamDetails
    }
  }
}
