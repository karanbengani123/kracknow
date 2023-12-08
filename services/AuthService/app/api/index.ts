import { Router } from "express";
import { controllerHandler } from "../../../../shared/lib/system/controllerHandler";
import { getCities } from "../../../CommonService/app/controllers/getCities";
import { adminLogin } from "../controllers/adminLogin";
import { forgetPassword } from "../controllers/forgotPassword";
import { getAdmin } from "../controllers/getAdmin";
import { getAdminByUUID } from "../controllers/getAdminByUUID";
import { studentLogin } from "../controllers/studentlogin";
import { studentRegister } from "../controllers/studentRegister";
import { adminUpdate } from "../controllers/updateAdmin";
import { adminLoginSchema } from "../validations/adminLoginSchema";
import { forgotPasswordSchema } from "../validations/forgotPasswordschema";
import { studentRegisterSchema } from "../validations/registerStudentSchema";
import { studentLoginSchema } from "../validations/studentLoginSchema";
import { addBankAccount } from "../controllers/addBankAdmin";
import { getBankdetail } from "../controllers/getBankdetail";
import { updateBankAccount } from "../controllers/updateBankAccountAdmin";
import { getBankdetailsforstudent } from "../controllers/getBankdetailsforstudent";


const router = Router();

router.post("/sessions/admin/auth", controllerHandler({controller: adminLogin,schema: adminLoginSchema}));

router.put(
  "/sessions/admin/forgetpassword",
  controllerHandler({
    controller: forgetPassword,
    schema: forgotPasswordSchema,
  })
);

router.post(
  "/sessions/student/register",
  controllerHandler({
    controller: studentRegister,
    schema: studentRegisterSchema,
  })
);

router.post(
  "/sessions/student/auth",
  controllerHandler({
    controller: studentLogin,
    schema: studentLoginSchema,
  })
);

router.get(
  "/sessions/cities",
  controllerHandler({
    controller: getCities,
    options: { transaction: false },
  })
);


router.get(
  "/sessions/admin/get",
  controllerHandler({
    controller: getAdmin,
  })
);


router.get(
  "/sessions/admin/:adminUUID",
  controllerHandler({
    controller: getAdminByUUID,
  })
);


router.post(
  "/sessions/:email",
  controllerHandler({
    controller: adminUpdate,
  })
);


// bank list view for admin
router.get(
  "/sessions/banklist",
  controllerHandler({
    controller: getBankdetail,
    options: { transaction: true },
  })
);

// bank list view for student
router.get(
  "/sessions/banklist_student",
  controllerHandler({
    controller: getBankdetailsforstudent,

  })
);

// bank entry for admin
router.post(
  "/sessions/admin/addBankDetails",
  controllerHandler({
    controller: addBankAccount,
  })
  );

  router.post(
    "/sessions/admin/updatebankdetail/:UUID",
    controllerHandler({
      controller: updateBankAccount,
    })
  );

export default router;
