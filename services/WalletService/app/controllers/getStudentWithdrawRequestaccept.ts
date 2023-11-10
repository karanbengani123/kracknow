import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";
import { Student, User, student_addmoney_request } from "../../../../shared/database/models";
import { IStudentaddmoneyRequest } from "../interfaces";
import { HttpNotFound } from "../../../../shared/exceptions/HttpNotFound";
import { studentWithdrawalRequestForAdminKeywordExclude, withdrawalRequestExcludeAttributes, withdrawalRequestStudentIncludeAttributes } from "../constant/excludeAttributes";
import { ONLY_ADMIN_ALLOWED } from "../../../../shared/constants/message";
import { parseLimitOffsetFromRequest } from '../../../../shared/helpers/parseLimitOffsetFromRequest'

export const getStudentWithdrawRequestaccept = async (
    params: IControllerParams<{}>
) => {
    const studentUUID = params.user.id;
    console.log('data', studentUUID)

    // const admin = await User.findByPk(params.user.id)
    // console.log(admin)
    // if (!admin) {
    //     throw new HttpNotFound(ONLY_ADMIN_ALLOWED)
    // }

    // const student = await student_addmoney_request.findAndCountAll({
    //     attributes: {
    //         exclude: studentWithdrawalRequestForAdminKeywordExclude,
    //     },
    //     include: [
    //         {
    //             model: Student,
    //             as: "addmoneyRequests_Student",
    //             attributes: withdrawalRequestStudentIncludeAttributes,
    //         },
    //     ],
    //     order: [["createdAt", "DESC"]],
    //     ...parseLimitOffsetFromRequest(params.args.queryString as { limit: any; page: any }),
    // });
    // console.log(student)

    // return {
    //     message: SUCCESSFUL,
    //     payload: student,
    // };
};