import { checkSchema } from 'express-validator'

export const scheduleTournamentSchema = checkSchema({
  exam: {
    in: ["body"],
    exists: {
      errorMessage: "exam  is required",
    },
    isEmpty: {
      errorMessage: "exam Cannot be Empty",
      negated: true,
    },
    isArray: {
      options: {
        min: 1
      },
      errorMessage:
        "exam array must contain minimum 1 objects",
    }
  },
  "exam.*.startTime": {
    exists: {
      errorMessage: "Start time  is required",
    },
    in: ["body"],
    isEmpty: {
      errorMessage: "Start time Cannot be Empty",
      negated: true,
    },
  },
  "exam.*.endTime": {
    exists: {
      errorMessage: "EndTime is required",
    },
    in: ["body"],
    isEmpty: {
      errorMessage: "endTime Cannot Be Empty",
      negated: true,
    },
  },
  "exam.*.examTime": {
    exists: {
      errorMessage: "examTime is required",
    },
    in: ["body"],
    isEmpty: {
      errorMessage: "examTime Cannot Be Empty",
      negated: true,
    },
    isIn: {
      options: [["FULL_DAY", "BASED_ON_TIME"]],
      errorMessage: "examTime must be an FULL_DAY, BASED_ON_TIME"
    },
  },
  "exam.*.examUUID": {
    exists: {
      errorMessage: "examUUID is required",
    },
    in: ["body"],
    isEmpty: {
      errorMessage: "examUUID Cannot Be Empty",
      negated: true,
    },
    isUUID: {
      errorMessage: "examUUID is not valid"
    },
  },
  "exam.*.examScheduleUUID": {
    exists: {
      errorMessage: "examScheduleUUID is required",
    },
    in: ["body"],
    isEmpty: {
      errorMessage: "examScheduleUUID Cannot Be Empty",
      negated: true,
    },
    isUUID: {
      errorMessage: "examScheduleUUID is not valid"
    },
  },
  timeZone: {
    in: ["body"],
    exists: {
      errorMessage: "timeZone is required",
    },
    isEmpty: {
      negated: true,
      errorMessage: "timeZone Cannot Be Empty",
    },
  }
});
