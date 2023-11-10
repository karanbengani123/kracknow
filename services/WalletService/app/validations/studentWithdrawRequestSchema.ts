import { checkSchema } from "express-validator";
import { HttpNotFound } from "../../../../shared/exceptions/HttpNotFound";

export const studentWithdrawRequestSchema = checkSchema({
  amount: {
    in: ["body"],
    exists: {
      errorMessage: "amount is required",
    },
    isEmpty: {
      negated: true,
      errorMessage: "amount is required",
    },
    isNumeric: {
      errorMessage: "amount type must be a number",
    },
  },
  transferMode: {
    in: ["body"],
    exists: {
      errorMessage: "transferMode is required",
    },
    isEmpty: {
      negated: true,
      errorMessage: "transferMode is required",
    },
    isIn: {
      options: [["paytm", "upi", "bank"]],
      errorMessage: "transferMode must be one of paytm, upi, bank",
    },
    custom: {
      options: (value, { req }) => {
        const body = req.body;
        console.warn(value);
        if (value === "upi") {
          if (!body.hasOwnProperty("upiID"))
            throw new HttpNotFound("upiID is required");
        } else if (value === "bank" && !body.hasOwnProperty("bankName")) throw new HttpNotFound("bankName is required");

        return true;
      },
    },
  },

  bankName: {
    in: ["body"],
    custom: {
      options: (value, { req }) => {
        console.warn(value);
        const body = req.body;
        if (body.hasOwnProperty("bankName"))
          if (
            !(
              body.hasOwnProperty("accountHolder") &&
              body.hasOwnProperty("accountNumber") &&
              body.hasOwnProperty("IFSCCode")
            )
          )
            throw new HttpNotFound(
              "bankName require properties like accountHolder, accountNumber, IFSCCode"
            );

        return true;
      },
    },
  },
});
