import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";
import { Wallet, student_addmoney_request } from "../../../../shared/database/models";
import { IStudentWithdrwRequest } from "../interfaces/IStudentWithdrwRequest";
import { PENDING } from "../../../../shared/constants/message";
import { HttpNotFound } from "../../../../shared/exceptions/HttpNotFound";
import { Request } from 'express';
// import {
//   INSUFFICIENT_BALANCE,
//   MINIMUM_AMOUNT,
// } from "../../../../shared/constants/httpErrorMessages";
// const uuid = require("uuid");

export const postStudentWithdrawReuest = async (
    params: IControllerParams<IStudentWithdrwRequest>
) => {
    const { input, image } = params;
    console.log(image)
    console.log(input)
    // let { transactionId ,amount} = input
    const studentUUID = params.user.id;
    //   const { transactionid } = input;
    console.log('data', studentUUID)

    // const wallet = await Wallet.findOne({
    //     where: {
    //         studentUUID,
    //     },
    // });

    // const addmoneyObject = {
    //     amount,
    //     transactionId,
    //     status: PENDING,
    //     studentUUID,
    // };

    // console.log(addmoneyObject)
    // let addmoney = await student_addmoney_request.create(addmoneyObject);

    // console.log(addmoney)
    // console.log(wallet)
    return {
        message: SUCCESSFUL,
      };
};