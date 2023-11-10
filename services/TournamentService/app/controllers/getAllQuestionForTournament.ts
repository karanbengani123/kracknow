import * as moment from 'moment'
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import {
  ExamQuestion,
  Question,
  QuestionOption,
  Tournament,
  TournamentParticipation
} from '../../../../shared/database/models'
import { parseLimitOffsetFromRequest } from '../../../../shared/helpers/parseLimitOffsetFromRequest'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'

export const getAllQuestionForTournament = async (params: IControllerParams<null>) => {
  const filterParams = params.args.queryString
  const examUUID = params.args.params.examUUID

  const categoryType = await TournamentParticipation.findOne({
    where: {
      uuid: params.args.params.tournamentParticipationUUID
    },
    include: [{ model: Tournament, as: "tournament", }],
    attributes: ['primarySubcategory', 'secondarySubcategory']
  })
  // const tournamentExam = await TournamentExamSchedule.findByPk(params.args.params.tournamentExamScheduleUUID, {
  //   include: [
  //     {
  //       model: Exam,
  //       as: "exam",
  //       where: {
  //         uuid: examUUID
  //       },
  //       attributes: ['timePerQuestion'],
  //       include: [{
  //         model: ExamQuestion,
  //         as: "questions"
  //       }]
  //     },
  //   ],
  // })
  // if (!tournamentExam) {
  //   throw new HttpNotFound(NOT_FOUND)
  // }

  const question = await ExamQuestion.findAll({
    where: {
      examUUID
    },
    attributes: ['uuid', 'examUUID'],
    include: [{
      model: Question,
      as: 'examQuestions',
      attributes: ['uuid', 'title', 'description', 'subCategoryUUID'],
      include: [{
        model: QuestionOption,
        as: 'options',
        attributes: ['text', 'key', 'image']
      }]
    }],
    ...parseLimitOffsetFromRequest(filterParams as { limit: any, page: any })
  })
  const count = await ExamQuestion.count({
    where: {
      examUUID
    }
  })

  return {
    message: SUCCESSFUL,
    payload: {
      response: question,
      timePerQuestion: categoryType.tournament[0].timePerQuestion,
      isLastRecord: count === (parseInt(filterParams.page, 10)),
      time: moment().utcOffset('+05:30').format('LTS'),
      categoryType: categoryType.primarySubcategory === question[0].examQuestions.subCategoryUUID ? 'PRIMARY' : categoryType.secondarySubcategory === question[0].examQuestions.subCategoryUUID ? 'SECONDARY' : null
    }
  }
}
