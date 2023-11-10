import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import { Exam, ExamQuestion, Question, SubCategory, Tournament, TournamentExamSchedule } from '../../../../shared/database/models'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'

export const getTournamentSubcategory = async (params: IControllerParams<null>) => {

  const subCategory = await Tournament.findByPk(params.args.params.tournamentUUID, {
    attributes: ["uuid"],
    group: ['label'],
    include: [
      {
        model: TournamentExamSchedule,
        as: "tournamentExamSchedule",
        attributes: ['examUUID'],
        include: [
          {
            model: Exam,
            as: "tournamentExamDetails",
            attributes: ["uuid"],
            include: [{
              model: ExamQuestion,
              as: 'questions',
              attributes: ["questionUUID"],
              include: [{
                model: Question,
                as: "examQuestions",
                attributes: ['uuid'],
                include: [{
                  model: SubCategory,
                  as: 'questionSubCategory',
                  attributes: ['uuid', 'label']
                }]
              }]
            }]
          }
        ]
      }
    ],
  });

  const result = [];
  subCategory.tournamentExamSchedule.forEach(outerObject => {
    outerObject.tournamentExamDetails.questions.forEach(innerObject => {
      const { uuid, label } = innerObject.examQuestions.questionSubCategory
      result.push({ uuid, label })
    })
  });


  return {
    message: SUCCESSFUL,
    payload: {
      response: result
    }
  }
}
