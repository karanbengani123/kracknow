import { NOT_FOUND } from "../../../../shared/constants/httpErrorMessages";
import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import {
  Exam,
  StudentCompletedTournamentExamsStatus,
  Tournament,
  TournamentParticipation,
  TournamentSchedule,
  TournamentScheduledExam,
} from "../../../../shared/database/models";
import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";

export const getTournamentExamList = async (
  params: IControllerParams<null>
) => {
  let participation;
  let examStatus;
  const tournament = await Tournament.findByPk(
    params.args.params.tournamentUUID
    // {
    //   include: [
    //     {
    //       model: TournamentSchedule,
    //       as: "tournamentSchedule",
    //       attributes: ["uuid", "startTime", "endTime", "createdAt", "tournamentTime", "tournamentUUID"],
    //       include: [
    //         {
    //           model: TournamentScheduledExam,
    //           as: "tournamentSchedule_TournamentScheduledExam",
    //           include: [
    //             {
    //               model: Exam,
    //               as: "tournamentScheduledExam_Exam"
    //             }
    //           ]
    //         },
    //       ],
    //       limit: 1,
    //       order: [['createdAt', 'DESC']]
    //     },
    //   ],
    // },
  );

  const tournamentSchedule = await TournamentSchedule.findOne({
    where: {
      tournamentUUID: tournament.uuid
    },
    attributes: ["uuid", "startTime", "endTime", "createdAt", "tournamentTime", "tournamentUUID"],
    include: [
      {
        model: TournamentScheduledExam,
        as: "tournamentSchedule_TournamentScheduledExam",
        include: [
          {
            model: Exam,
            as: "tournamentScheduledExam_Exam"
          }
        ],
        order: [['startTime', 'DESC']]
      },
    ],
    order: [['createdAt', 'DESC']]
  })


  if (tournament) {
    participation = await TournamentParticipation.findOne({
      where: {
        tournamentUUID: tournament.uuid,
        studentUUID: params.user.id,
        // tournamentScheduleUUID: tournamentExam.tournamentSchedule.uuid
        tournamentScheduleUUID: tournamentSchedule.uuid

      },
      attributes: ['uuid', 'status']
    })
    if (participation)
      examStatus = await StudentCompletedTournamentExamsStatus.findAll({
        where: {
          tournamentParticipationUUID: participation.uuid
        }
      })
  }
  return {
    message: tournament ? SUCCESSFUL : NOT_FOUND,
    payload: { tournament, tournamentSchedule, examStudent: participation ? true : false, participation, examStatus }
  };
};
