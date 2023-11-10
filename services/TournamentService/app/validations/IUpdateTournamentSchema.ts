import { checkSchema } from "express-validator";

export const updateTournmentSchema = checkSchema({
  title: {
    exists: {
      errorMessage: "Tournament title is required",
    },
    in: ["body"],
    isEmpty: {
      errorMessage: "Tournament title is required",
      negated: true,
    },
  },
  allowPrimarySelection: {
    exists: {
      errorMessage: "allowPrimarySelection is required",
    },
    in: ["body"],
    isEmpty: {
      errorMessage: "allowPrimarySelection is required",
      negated: true,
    },
  },
  allowSecondarySelection: {
    exists: {
      errorMessage: "allowSecondarySelection is required",
    },
    in: ["body"],
    isEmpty: {
      errorMessage: "allowSecondarySelection is required",
      negated: true,
    },
  },
  categoryUUID: {
    exists: {
      errorMessage: 'category is required'
    },
    in: ['body'],
    isEmpty: {
      errorMessage: 'Category is required',
      negated: true
    },
    isUUID: {
      errorMessage: 'Category is required'
    }
  },
  joinDelay: {
    exists: {
      errorMessage: "joinDelay is required",
    },
    in: ["body"],
    isEmpty: {
      errorMessage: "joinDelay cannot be empty",
      negated: true,
    },
  },
  webBanner: {
    exists: {
      errorMessage: "webBanner is required",
    },
    in: ["body"],
    isEmpty: {
      errorMessage: "webBanner cannot be empty",
      negated: true,
    },
  },
  phoneBanner: {
    exists: {
      errorMessage: "phoneBanner is required",
    },
    in: ["body"],
    isEmpty: {
      errorMessage: "phoneBanner cannot be empty",
      negated: true,
    },
  },
  studentLimit: {
    exists: {
      errorMessage: "Student Limit is required",
    },
    isEmpty: {
      errorMessage: "Student Limit is required",
      negated: true,
    },
  },
  isFree: {
    exists: {
      errorMessage: "isFree is required",
    },
    in: ["body"],
    isEmpty: {
      errorMessage: "isFree is required",
      negated: true,
    },
    isBoolean: {
      errorMessage: "isFree is required",
    },
  },
  isFeatured: {
    exists: {
      errorMessage: "isFeatured is required",
    },
    in: ["body"],
    isEmpty: {
      errorMessage: "isFeatured is required",
      negated: true,
    },
    isBoolean: {
      errorMessage: "isFeaturedis required",
    },
  },
  joinFee: {
    exists: {
      errorMessage: "joinFee is required",
    },
  },
  winningPrice: {
    exists: {
      errorMessage: "winningPrice is required",
    },
    in: ["body"],
    isEmpty: {
      errorMessage: "winningPrice is required",
      negated: true,
    },
  },
  marksPerQuestion: {
    exists: {
      errorMessage: "marksPerQuestion is required",
    },
    in: ["body"],
    isEmpty: {
      errorMessage: "marksPerQuestion is required",
      negated: true,
    },
  },
  timePerQuestion: {
    exists: {
      errorMessage: "timePerQuestion is required",
    },
    in: ["body"],
    isEmpty: {
      errorMessage: "timePerQuestion is required",
      negated: true,
    },
  },
  "tournamentCities.*.uuid": {
    exists: {
      errorMessage: "uuid is required",
    },
    in: ["body"],
    isEmpty: {
      errorMessage: "uuid is required",
      negated: true,
    },
  },
  "tournamentKeywords.*.attribute": {
    exists: {
      errorMessage: "attribute are required",
    },
    in: ["body"],
    isEmpty: {
      errorMessage: "attribute are required",
      negated: true,
    },
  },
  "tournamentExams.*.examUUID": {
    exists: {
      errorMessage: "uuid is required",
    },
    in: ["body"],
    isEmpty: {
      errorMessage: "uuid is required",
      negated: true,
    },
  },
  "tournamentExams.*.serialNo": {
    exists: {
      errorMessage: "serialNo is required",
    },
    in: ["body"],
    isEmpty: {
      errorMessage: "serialNo is required",
      negated: true,
    },
  },
  "tournamentPrize.*.toValue": {
    exists: {
      errorMessage: "toValue is required",
    },
    in: ["body"],
    isEmpty: {
      errorMessage: "toValue is required",
      negated: true,
    },
  },
  "tournamentPrize.*.fromValue": {
    exists: {
      errorMessage: "fromValue is required",
    },
  },
  "tournamentPrize.*.amount": {
    exists: {
      errorMessage: "amount is required",
    },
    in: ["body"],
    isEmpty: {
      errorMessage: "amount is required",
      negated: true,
    },
  },
  // tournamentRankingFactor: {
  //   in: ["body"],
  //   optional: true,
  //   isEmpty: {
  //     errorMessage: "tournamentRankingFactor is required",
  //     negated: true,
  //   },
  // },
  // "tournamentRankingFactor.*.type": {
  //   in: ["body"],
  //   optional: true,
  //   isEmpty: {
  //     errorMessage: " type Cannot be empty",
  //     negated: true,
  //   },
  // },
  // "tournamentRankingFactor.*.point": {
  //   in: ["body"],
  //   optional: true,
  //   isEmpty: {
  //     errorMessage: "point Cannot be empty",
  //     negated: true,
  //   },
  // },
  // "tournamentRankingFactor.*.coins": {
  //   in: ["body"],
  //   optional: true,
  //   isEmpty: {
  //     errorMessage: "coins Cannot be empty",
  //     negated: true,
  //   },
  //   isNumeric: {
  //     errorMessage: "coins is not valid number",
  //   },
  // },
});
