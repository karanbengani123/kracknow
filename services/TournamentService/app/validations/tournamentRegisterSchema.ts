import { checkSchema } from 'express-validator'

export const tournamentRegisterSchema = checkSchema({

  currentTime: {
    exists: {
      errorMessage: "currentTime  is required",
    },
    in: ["body"],
    isEmpty: {
      errorMessage: "currentTime Cannot be Empty",
      negated: true,
    },
  },

  // primarySubcategory: {
  //   exists: {
  //     errorMessage: "primarySubcategory is required",
  //   },
  //   in: ["body"],
  //   isEmpty: {
  //     errorMessage: "primarySubcategory Cannot Be Empty",
  //     negated: true,
  //   },
  //   isUUID: {
  //     errorMessage: "primarySubcategory is not valid uuid"
  //   },
  // },
  // secondarySubcategory: {
  //   exists: {
  //     errorMessage: "secondarySubcategory is required",
  //   },
  //   in: ["body"],
  //   isEmpty: {
  //     errorMessage: "secondarySubcategory Cannot Be Empty",
  //     negated: true,
  //   },
  //   isUUID: {
  //     errorMessage: "secondarySubcategory is not valid uuid"
  //   },
  // }
});
