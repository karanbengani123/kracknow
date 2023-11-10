import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { Exam, ExamBanner, ExamPriceRatio, ExamRankingFactor, TournamentExamSchedule, TournamentParticipation } from '../../../../shared/database/models'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'

export const getTournamentExamDetails = async (params: IControllerParams<null>) => {
  const examUUID = params.args.params.examUUID
  const participation = await TournamentParticipation.findOne({
    where: {
      studentUUID: params.user.id,
      examUUID
    }
  })
  if (!participation)
    throw new HttpNotFound(`No tournament participation found for exam ${examUUID}`)

  const tournamentExamSchedule = await TournamentExamSchedule.findOne({
    where: {
      examUUID
    },
    include: [
      {
        model: Exam,
        as: "exam",
        include: [{
          model: ExamRankingFactor,
          as: 'examRankingFactor'
        },
        {
          model: ExamBanner,
          as: 'examBanner'
        },
        {
          model: ExamPriceRatio,
          as: 'examprice'
        }],
      }
    ]
  })

  if (!tournamentExamSchedule)
    throw new HttpNotFound('No tournament exam schedule found for exam')

  return {
    message: SUCCESSFUL,
    payload: tournamentExamSchedule
  }
}

