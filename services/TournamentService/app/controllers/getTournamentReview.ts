
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { Student, Tournament, TournamentExamParticipationQuestion, TournamentExamParticipationQuestionOption, TournamentKeyword, TournamentParticipation, TournamentPriceDistribution, TournamentSchedule } from '../../../../shared/database/models'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'

export const getTournamentReview = async (params: IControllerParams<null>) => {
  const tournamentReview = await TournamentParticipation.findOne({
    where: {
      tournamentScheduleUUID: params.args.params.tournamentScheduleUUID,
      studentUUID: params.args.params.studentUUID
    }, 
    include: [{
      model: TournamentSchedule,
      as: "tournamentSchedule",
      include: [
        {
          model: Tournament,
          as: "tournament",
          include: [{

            model: TournamentKeyword,
            as: "tournamentKeywords",
            attributes: ['attribute'],

          }]
        }, {
          model: TournamentPriceDistribution,
          as: "tournamentScheduleTournamentPriceDistribution",
          where: {
            studentUUID: params.args.params.studentUUID
          }
        }
      ]
    }, {
      model: Student,
      as: "students",
      attributes: ['firstName', 'lastName']
      }, {
        model: TournamentExamParticipationQuestion,
        as: "tournamentExamParticipationQuestion",
        include: [{
          model: TournamentExamParticipationQuestionOption,
          as: "tournamentExamParticipationQuestionOption",
        }]
    }]
  })



  return {
    message: SUCCESSFUL,
    payload: {
      response: tournamentReview
    }
  }
}
