
import { TOURNAMENT_EXAM_PARTICIPATION_QUESTION_NOT_FOUND } from '../../../../shared/constants/httpErrorMessages'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import {
  TournamentExamParticipationQuestion, TournamentExamParticipationQuestionOption,
} from '../../../../shared/database/models'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'

export const getPreviousQuestion = async (params: IControllerParams<null>) => {

  const question = await TournamentExamParticipationQuestion.findOne({
    where: {
      questionUUID: params.args.params.questionUUID,
      tournamentParticipationUUID: params.args.params.tournamentParticipationUUID,
    },
    include: [{
      model: TournamentExamParticipationQuestionOption,
      as: "tournamentExamParticipationQuestionOption",
      attributes: ["tournamentExamParticipationQuestionUUID", "key", "image", "text"]
    }],
    attributes: ["examUUID", "questionUUID", "title", "description", "givenAnswer", "status"]
  })

  if (!question)
    throw new HttpNotFound(TOURNAMENT_EXAM_PARTICIPATION_QUESTION_NOT_FOUND)

  return {
    message: SUCCESSFUL,
    payload: question
  }
}
