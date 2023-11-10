
import { TOURNAMENT_PARTICIPATION_NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { COMPLETED } from '../../../../shared/constants/message'
import { Exam, Tournament, TournamentExamParticipationQuestion, TournamentExamSchedule, TournamentParticipation, TournamentPriceDistribution, TournamentSchedule } from '../../../../shared/database/models'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'

export const getTournamentLeaderBoard = async (params: IControllerParams<null>) => {
  const leaderBoard = await TournamentParticipation.findByPk(params.args.params.tournamentParticipationUUID, {
    attributes: ["uuid", "tournamentUUID", "tournamentScheduleUUID"],
    include: [{
      model: Tournament,
      as: "tournament",
      include: [
        {
          model: TournamentExamSchedule,
          as: "tournamentExamSchedule",
          attributes: ["examUUID"],
          include: [
            {
              model: Exam,
              as: "tournamentExamDetails",
              attributes: ["uuid", "title"],
            }
          ]
        }]
    }, {
      model: TournamentSchedule, 
      as: "tournamentSchedule",
        include: [{
          model: TournamentPriceDistribution,
          as: "tournamentPriceDistribution"
        }],
      }, {
      model: TournamentExamParticipationQuestion,
      as: "tournamentExamParticipationQuestion",
      include: [{
        model: Exam,
        as: "tournamentExamParticipationQuestion_Exam",
        attributes: ["uuid", "title"]
      }],
      attributes: ["tournamentParticipationUUID", "examUUID", "isCorrect"],
      order: ["examUUID"]
    }]
  })

  if (!leaderBoard) {
    throw new HttpNotFound(TOURNAMENT_PARTICIPATION_NOT_FOUND)
  }
  const tournamentParticipation = await TournamentParticipation.findAll({
    where: {
      tournamentScheduleUUID: leaderBoard.tournamentScheduleUUID,
      status: COMPLETED
    },
    order: [['marks', 'DESC']]
  })

  const chart = []

  let correct: number = 0
  let incorrect: number = 0

  let tempName: string = null;
  for (const o of leaderBoard.tournamentExamParticipationQuestion) {
    const tempExamName = o.tournamentExamParticipationQuestion_Exam.title
    tempName = tempName ?? tempExamName
    if (tempName !== tempExamName) {
      chart.push({
        examName: tempName,
        correct,
        incorrect
      })
      correct = 0
      incorrect = 0
      tempName = tempExamName
    }
    if (o.isCorrect)
      correct += 1
    else
      incorrect += 1
  }
  chart.push({
    examName: tempName,
    correct,
    incorrect
  })


  return {
    message: SUCCESSFUL,
    payload: {
      response: { leaderBoard, chart, tournamentParticipation }
    }
  }
}