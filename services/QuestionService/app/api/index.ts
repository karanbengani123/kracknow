import { Router } from "express";
import { controllerHandler } from "../../../../shared/lib/system/controllerHandler";
import { addQuestion } from "../controllers/addQuestion";
import { deleteQuestion } from "../controllers/deleteQuestion";
import { getAllQuestions } from "../controllers/getAllQuestions";
import { getQuestionById } from "../controllers/getQuestionById";
import { importQuestion } from "../controllers/importQuestion";
import { updateQuestion } from "../controllers/updateQuestion";
import { addQuestionSchema } from "../validations/addQuestionSchema";

import { updateQuestionSchema } from "../validations/updateQuestionSchema";

const router = Router();

router.post(
  "/questions",
  controllerHandler({
    controller: addQuestion,
    schema: addQuestionSchema,
  })
);

router.put(
  "/questions/:id",
  controllerHandler({
    controller: updateQuestion,
    schema: updateQuestionSchema,
  })
);

router.delete(
  "/questions/:id",
  controllerHandler({
    controller: deleteQuestion,
  })
);

router.get(
  "/questions",
  controllerHandler({
    controller: getAllQuestions,
    options: { transaction: false },
  })
);

router.get(
  "/questions/:id",
  controllerHandler({
    controller: getQuestionById,
    options: { transaction: false },
  })
);

router.post(
  "/questions/import/question",
  controllerHandler({
    controller: importQuestion,
    // schema: importQuestionSchema,
    options: { transaction: false },
  })
);

export default router;
