
import { TOURNAMENT_EXAM_PARTICIPATION_QUESTION_NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { TournamentExamParticipationQuestion } from '../../../../shared/database/models'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'

export const tournamentExamResult = async (
  params: IControllerParams<null>
) => {
  const tournamentExamResult = await TournamentExamParticipationQuestion.findAll({
    where: {
      tournamentParticipationUUID: params.args.params.tournamentParticipationUUID
    }
  })
  if (!tournamentExamResult) {
    throw new HttpNotFound(TOURNAMENT_EXAM_PARTICIPATION_QUESTION_NOT_FOUND)
  }
  const response = {
    marks: 0,
    correct: 0,
    incorrect: 0,
    answered: 0,
    skipped: 0,
    timeout: 0
  }
  if (tournamentExamResult) {
    for (let o of tournamentExamResult) {
      response.marks += o.mark;
      if (o.isCorrect && o.status === "ANSWERED")
        response.correct += 1
      else if (o.isCorrect === false && o.status === "ANSWERED")
        response.incorrect += 1

      if (o.status === "ANSWERED")
        response.answered += 1
      else if (o.status === "SKIPPED")
        response.skipped += 1
      else if (o.status === "TIME_OUT")
        response.timeout += 1
    }
  }


  return {
    message: SUCCESSFUL,
    payload: response
  }
}