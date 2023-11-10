import { Router } from "express";
import { controllerHandler } from "../../../../shared/lib/system/controllerHandler";
import { addTournament } from "../controllers/createTournament";
import { deleteTournament } from "../controllers/deleteTournament";
import { getAllQuestionForTournament } from "../controllers/getAllQuestionForTournament";
import { getAllTournaments } from "../controllers/getAllTournaments";
import { getExamDetails } from "../controllers/getExamDetails";
import { getPreviousQuestion } from "../controllers/getPreviousQuestion";
import { getRegisteredTournamentList } from "../controllers/getRegisteredTournamentList";
import { getScheduledTournamentList } from "../controllers/getScheduledTournamentList";
import { getTournamentSubcategory } from "../controllers/getSubcategoryForStudent";
import { getTournamentCurrentExamResult } from "../controllers/getTournamentCurrentExamResult";
import { getTournamentDetails } from "../controllers/getTournamentDetails";
import { getTournamentExamDetails } from "../controllers/getTournamentExamDetails";
import { getTournamentExamList } from "../controllers/getTournamentExamList";
import { getTournamentLeaderBoard } from "../controllers/getTournamentLeaderBoard";
import { getTournamentReview } from "../controllers/getTournamentReview";
import { getTournamentScheduledList } from "../controllers/getTournamentScheduledList";
import { postAnswerSubmit } from "../controllers/postAnswerSubmit";
import { postScheduleTournament } from "../controllers/postScheduleTournament";
import { postTournamentRegister } from "../controllers/postTournamentRegister";
import { postTournamentUnRegister } from "../controllers/postTournamentUnRegister";
import { putScheduleTournamentUpdate } from "../controllers/putScheduleTournamentUpdate";
import { tournamentExamResult } from "../controllers/tournamentExamResult";
import { tournamentStartExam } from "../controllers/tournamentStartExam";
import { updateTournament } from "../controllers/updateTournament";
import { examTakenSchema } from "../validations/ExamTakenByStudentSchema";
import { createTournamentSchema } from "../validations/ICreateTournamentSchema";
import { updateTournmentSchema } from "../validations/IUpdateTournamentSchema";
import { scheduleTournamentSchema } from "../validations/scheduleTournamentSchema";
import { tournamentRegisterSchema } from "../validations/tournamentRegisterSchema";
import { tournamentStartExamSchema } from "../validations/tournamentStartExamSchema";

const router = Router();

router.post(
  "/tournaments/addTournament",
  controllerHandler({
    controller: addTournament,
    schema: createTournamentSchema,
  })
);

router.get(
  "/tournaments/:tournamentUUID",
  controllerHandler({
    controller: getTournamentDetails,
    options: { transaction: false },
  })
);
router.get(
  "/tournaments/scheduled/:tournamentUUID/list",
  controllerHandler({
    controller: getTournamentScheduledList,
    options: { transaction: false },
  })
);

router.put(
  "/tournaments/:tournamentUUID",
  controllerHandler({
    controller: updateTournament,
    schema: updateTournmentSchema,
    options: { transaction: true },
  })
);

router.get(
  "/tournaments/all/list",
  controllerHandler({
    controller: getAllTournaments,
    options: { transaction: false },
  })
);

router.delete(
  "/tournaments/:tournamentUUID",
  controllerHandler({
    controller: deleteTournament,
    options: { transaction: true },
  })
);

router.post(
  "/tournaments/schedule/:tournamentUUID",
  controllerHandler({
    controller: postScheduleTournament,
    schema: scheduleTournamentSchema,
    options: { transaction: true },
  })
);

router.put(
  "/tournaments/schedule/:tournamentScheduleUUID",
  controllerHandler({
    controller: putScheduleTournamentUpdate,
    schema: scheduleTournamentSchema,
    options: { transaction: true },
  })
);

// student part

router.post(
  "/tournaments/:tournamentScheduleUUID/register",
  controllerHandler({
    controller: postTournamentRegister,
    schema: tournamentRegisterSchema,
    options: { transaction: true },
  })
);

router.delete(
  "/tournaments/:tournamentScheduleUUID/participation/:participationUUID/unregister",
  controllerHandler({
    controller: postTournamentUnRegister,
  })
);

router.get(
  "/tournaments/:tournamentUUID/examlist",
  controllerHandler({
    controller: getTournamentExamList,
    options: { transaction: false },
  })
);

router.get(
  "/tournaments/registered/list",
  controllerHandler({
    controller: getRegisteredTournamentList,
    options: { transaction: false },
  })
);

router.get(
  "/tournaments/scheduled/list",
  controllerHandler({
    controller: getScheduledTournamentList,
    options: { transaction: false },
  })
);

router.get(
  '/tournaments/:examUUID/examdetails',
  controllerHandler({
    controller: getTournamentExamDetails,
    options: { transaction: false },
  })
)

router.put(
  '/tournaments/exam/start',
  controllerHandler({
    controller: tournamentStartExam,
    schema: tournamentStartExamSchema,
  })
)

router.get(
  '/tournaments/:examUUID/live/status/:tournamentExamScheduleUUID/:tournamentParticipationUUID',
  controllerHandler({
    controller: getAllQuestionForTournament,
    options: { transaction: false },
  })
)

router.get(
  '/tournaments/:tournamentParticipationUUID/previous/question/:questionUUID/status',
  controllerHandler({
    controller: getPreviousQuestion,
    options: { transaction: false },
  })
)

router.post(
  '/tournaments/:tournamentParticipationUUID/live/answer',
  controllerHandler({
    controller: postAnswerSubmit,
    schema: examTakenSchema,
  })
)

// for current student exam dynamic result
router.get(
  '/tournaments/exam/:tournamentParticipationUUID/result/publish',
  controllerHandler({
    controller: tournamentExamResult,
    options: { transaction: false }
  })
)
// for current student exam result
router.get(
  '/tournaments/exam/:examUUID/:tournamentParticipationUUID/result',
  controllerHandler({
    controller: getTournamentCurrentExamResult,
    options: { transaction: false }
  })
)
// student tournament 
router.get(
  '/tournaments/leaderBoard/:tournamentParticipationUUID',
  controllerHandler({
    controller: getTournamentLeaderBoard,
    options: { transaction: false },
  })
)
// exam details with question and question options
router.get(
  '/tournaments/leaderBoard/:tournamentParticipationUUID/exam/:examUUID/details',
  controllerHandler({
    controller: getExamDetails,
    options: { transaction: false },
  })
)

router.get(
  '/tournaments/schedule/:tournamentScheduleUUID/student/:studentUUID/review',
  controllerHandler({
    controller: getTournamentReview,
    options: { transaction: false },
  })
)

router.get(
  '/tournaments/participation/:tournamentUUID/subCategory/list',
  controllerHandler({
    controller: getTournamentSubcategory,
    options: { transaction: false }
  })
)

export default router;
