import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages';
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams';
import { Wallet } from '../../../../shared/database/models';

export const depositMoney = async (params: IControllerParams<{ balance: number; transaction_id: any }>) => {
  try {
    const { balance, transaction_id }: any = params.input;
    const studentUUID = params.user.id
    
    if (balance <= 0) {
      return {
        message: 'Invalid amount. Amount must be greater than 0.',
        error: 'Invalid amount',
      };
    }

    await Wallet.create({
      studentUUID,
      balance,
      status: 'PENDING',
      transaction_id,
    });

    return {
      message: SUCCESSFUL,
      payload: 'Deposit request submitted successfully',
    };
  } catch (error) {
    console.error('Error depositing money:', error);
    return {
      message: 'An error occurred while depositing money',
      error: error?.message,
    };
  }
};
