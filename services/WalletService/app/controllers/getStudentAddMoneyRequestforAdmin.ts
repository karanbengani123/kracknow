import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";
import { Student, User, Wallet, student_addmoney_request } from "../../../../shared/database/models";
import { HttpNotFound } from "../../../../shared/exceptions/HttpNotFound";
import { studentWithdrawalRequestForAdminKeywordExclude, walletAllHistoryExcludeAttributes, walletAttributes, withdrawalRequestExcludeAttributes, withdrawalRequestStudentIncludeAttributes } from "../constant/excludeAttributes";
import { ONLY_ADMIN_ALLOWED } from "../../../../shared/constants/message";
import { parseLimitOffsetFromRequest } from '../../../../shared/helpers/parseLimitOffsetFromRequest'
import { Op } from "sequelize";

export const getStudentAddMoneyRequestforAdmin = async (
    params: IControllerParams<{}>
) => {
    const queryString = params.args.queryString;
    const where: any = { }
    const search = queryString.q;

    if (search) {
        where[Op.or] = [
          { '$addmoneyRequests_Student.firstName$': { [Op.like]: `%${search}%` } },
          { '$addmoneyRequests_Student.lastName$': { [Op.like]: `%${search}%` } },
        ];
      }

    const admin = await User.findByPk(params.user.id)
    if (!admin) {
        throw new HttpNotFound(ONLY_ADMIN_ALLOWED)
    }
try{

    var student = await student_addmoney_request.findAndCountAll({
        where,
        attributes: {
            exclude: studentWithdrawalRequestForAdminKeywordExclude,
        },
        include: [
            {
                model: Student,
                as: "addmoneyRequests_Student",
                attributes: withdrawalRequestStudentIncludeAttributes,
                include: [
                    {
                      model: Wallet,
                      as: "studentWallet",
                      attributes:walletAttributes,
                    },
                  ],
            },
        ],
        order: [["createdAt", "DESC"]],
        ...parseLimitOffsetFromRequest(params.args.queryString as { limit: any; page: any }),
    });
}catch (error){
console.log(error)
}


    return {
        message: SUCCESSFUL,
        payload: student,
    };
};