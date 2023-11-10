import { checkSchema } from "express-validator";

export const importQuestionSchema = checkSchema({
    fileName: {
        exists: {
            errorMessage: "fileName is required",
        },

        in: ["body"],

        isEmpty: {
            errorMessage: "fileName is required",
            negated: true,
        },
    },
    categoryUUID: {
        exists: {
            errorMessage: "categoryUUID is required",
        },

        in: ["body"],

        isEmpty: {
            errorMessage: "categoryUUID is required",
            negated: true,
        },
    },

    subCategoryUUID: {
        exists: {
            errorMessage: "subCategoryUUID is required",
        },

        in: ["body"],

        isEmpty: {
            errorMessage: "subCategoryUUID is required",
            negated: true,
        },
    },
});
