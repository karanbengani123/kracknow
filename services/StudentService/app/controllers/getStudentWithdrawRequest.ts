  import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages'
  import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
  import {
    Student,
    // Student,
    User,
    Wallet,
    // Wallet,
    WithdrawlRequest
  } from '../../../../shared/database/models'
  import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
  import { ONLY_ADMIN_ALLOWED } from '../../../../shared/constants/message'
import { withdrawalRequestStudentIncludeAttributes } from '../../../WalletService/app/constant/excludeAttributes'
  //import { withdrawalRequestStudentIncludeAttributes } from '../../../WalletService/app/constant/excludeAttributes'

  export const getStudentWithdrawRequest = async (
    params: IControllerParams<null>
  ) => {

    console.log('==============params---------',params)
    console.log('==============================111',params.args.params.UUID)

    try {
      
      const admin = await User.findByPk(params.user.id)
      if (!admin) {
        throw new HttpNotFound(ONLY_ADMIN_ALLOWED)
      }
      var withdrawalRequest = await WithdrawlRequest.findOne({
        where: {
          uuid: params.args.params.UUID
        },
      })
  
      console.log(withdrawalRequest)
    } catch (error) {
      return {
        pauload:error
      }
    }
    const student = await Student.findOne({ 
      where: { uuid: withdrawalRequest.dataValues.studentUUID },
      attributes: withdrawalRequestStudentIncludeAttributes,
      include: [{model: Wallet, as :"wallet"}]
    });

    console.log(student)

    return {
      message: SUCCESSFUL,
      payload: { withdrawalRequest, student }
    }
  }