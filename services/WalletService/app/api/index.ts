import { Router } from "express";
import { controllerHandler } from "../../../../shared/lib/system/controllerHandler";
import {
  getWalleBalance,
  postGetToken,
  getTransactionHistory,
  postAdminAddMoney,
  postStudentWithdrawRequest,
  getAllTransactionHistory,
  getStudentWithdrawRequest,
  postGetWebToken,
  bankNameList,
  postStudentaddmoneyRequest,
} from "../controllers";
import { getTransactionHistoryByWalletUUID } from "../controllers/getTransactionHistoryByWalletUUID";
import {
  adminAddMoneySchema,
  studentWithdrawRequestSchema,
  walletSchema,
} from "../validations";
import { seedWalletTrans } from "../controllers/seedWalletTrans";
import {
  getWithdrawRequest,
  getWithdrawRequestList,
} from "../controllers/getStudentWithdrawRequest";
import { approveWithdrawal } from "../controllers/approveWithdrawal";
import { getStudentAddMoneyRequestforAdmin } from "../controllers/getStudentAddMoneyRequestforAdmin";
// import { getStudentWithdrawRequestaccept } from "../controllers/getStudentWithdrawRequestaccept";
import { getStudentAddMoneyRequestforAdminseperate } from "../controllers/getStudentAddMoneyRequestforAdminseperate";
import { Wallettransactions } from "../controllers/Wallettransactions";
import { wallettransactionsforWithdrawal } from "../controllers/wallettransactionsforWithdrawal";

const router = Router();

router.get("/wallet/hello", ( req, res) => {
  console.log(req.body)
  return res.send(new Date());
});

router.post(
  "/wallet/gettoken",
  controllerHandler({
    controller: postGetToken,
    schema: walletSchema,
    options: { transaction: true },
  })
);

router.post(
  "/wallet/getwebtoken",
  controllerHandler({
    controller: postGetWebToken,
    schema: walletSchema,
    options: { transaction: true },
  })
);

router.post(
  "/wallet/adminaddmoney",
  controllerHandler({
    controller: postAdminAddMoney,
    schema: adminAddMoneySchema,
    options: { transaction: true },
  })
);

router.get(
  "/wallet/balance",
  controllerHandler({
    controller: getWalleBalance,
    options: { transaction: false },
  })
);

router.get(
  "/wallet/history",
  controllerHandler({
    controller: getTransactionHistory,
    options: { transaction: false },
  })
);

router.get(
  "/wallet/:walletUUID/history",
  controllerHandler({
    controller: getTransactionHistoryByWalletUUID,
    options: { transaction: false },
  })
);

router.get(
  "/wallet/allhistory",
  controllerHandler({
    controller: getAllTransactionHistory,
    options: { transaction: false },
  })
);

// wallettransactions for student view
router.get(
  "/wallet/wallettransactions",
  controllerHandler({
    controller: Wallettransactions,
    options: { transaction: false },
  })
);

router.get(
  "/wallet/wallettransactionsforWithdrawal",
  controllerHandler({
    controller: wallettransactionsforWithdrawal,
    options: { transaction: false },
  })
);

// student request for add money
router.post(
  "/wallet/studentaddmoneyrequest",
  controllerHandler({
    controller: postStudentaddmoneyRequest,
    options: { transaction: true },
  })
);

router.get(
  "/wallet/studentaddmoneyrequestforadmin/:UUID",
  controllerHandler({
    controller: getStudentAddMoneyRequestforAdminseperate,
    options: { transaction: true },
  })
);

// student request admin listman
router.get(
  "/wallet/studentaddmoneyrequestforadmin",
  controllerHandler({
    controller: getStudentAddMoneyRequestforAdmin,
    options: { transaction: false },
  })
);

// admin addamount to student Wallet
router.post(
  "/wallet/adminaddmoney/:UUID",
  controllerHandler({
    controller: postAdminAddMoney,
    options: { transaction: true },
  })
);

// student withdrawal request
router.post(
  "/wallet/studentwithdrawalrequest",
  controllerHandler({
    controller: postStudentWithdrawRequest,
    schema: studentWithdrawRequestSchema,
    options: { transaction: true },
  })
);

router.get(
  "/wallet/studentwithdrawalrequest",
  controllerHandler({
    controller: getStudentWithdrawRequest,
    options: { transaction: false },
  })
);

// router.get(
//   "/wallet/studentwithdrawalrequestaccept",
//   controllerHandler({
//     controller: getStudentWithdrawRequestaccept,
//     options: { transaction: false },
//   })
// );

router.get(
  "/wallet/withdrawRequestList",
  controllerHandler({
    controller: getWithdrawRequestList,
    options: { transaction: false },
  })
);

router.get(
  "/wallet/withdrawRequest/:uuid",
  controllerHandler({
    controller: getWithdrawRequest,
    options: { transaction: false },
  })
);

router.get(
  "/wallet/bank/list",
  controllerHandler({
    controller: bankNameList,
    options: { transaction: false },
  })
);

router.get(
  "/wallet/create",
  controllerHandler({
    controller: seedWalletTrans,
  })
);

router.put(
  "/wallet/approveWithrawal/:uuid",
  controllerHandler({
    controller: approveWithdrawal,
  })
);

export default router;
