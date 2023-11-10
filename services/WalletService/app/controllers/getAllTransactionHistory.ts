import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
import {
    Student,
    Wallet,
    WalletTransaction
} from '../../../../shared/database/models'
import { parseLimitOffsetFromRequest } from '../../../../shared/helpers/parseLimitOffsetFromRequest'
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { studentAttributesWithoutFAndSName } from '../constant'
import { walletAllHistoryExcludeAttributes } from '../constant/excludeAttributes'
import { Op } from "sequelize";

export const getAllTransactionHistory = async (
    params: IControllerParams<null>
) => {
    const queryString = params.args.queryString;

    const where: any = { deletedAt: null }
    console.log(queryString)
    const search = queryString.q;
    if (search) {

        where[Op.or] = [
            { firstName: { [Op.like]: search } },
            { lastName: { [Op.like]: search } },
            { email: { [Op.like]: search } },
        ]
    }

    const student = await Student.findAndCountAll({
        where,
        include: [
            {
                model: Wallet,
                as: "wallet",
                attributes: {
                    exclude: [
                        "updatedAt",
                        "studentUUID",
                        "createdAt",
                        "deletedAt",
                    ],
                },
                include: [
                    {
                        model: WalletTransaction,
                        as: "wallettransaction",
                        separate: true,
                        attributes: {
                            exclude: walletAllHistoryExcludeAttributes,
                        },
                    },
                ],
            },
        ],
        attributes: {
            exclude: studentAttributesWithoutFAndSName,
        },
          ...parseLimitOffsetFromRequest(queryString as { limit: any; page: any }),
    });

    return {
        message: SUCCESSFUL,
        payload: student,
    };
}
