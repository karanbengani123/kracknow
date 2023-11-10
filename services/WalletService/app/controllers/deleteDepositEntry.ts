import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages';
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams';
import { User, Wallet } from '../../../../shared/database/models';
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound';
import { ONLY_ADMIN_ALLOWED } from '../../../../shared/constants/message';

export const deleteStudentDeposit = async (params: IControllerParams<{ depositId: number }>) => {
  try {

    const { depositId }: any = params.input;
    const admin = await User.findByPk(params.user.id);
    if (!admin) {
      throw new HttpNotFound(ONLY_ADMIN_ALLOWED);
    }
    // Find the deposit entry by depositId
    const deposit = await Wallet.findOne({ where: { id: depositId } });

    if (!deposit) {
      return {
        message: 'Deposit not found',
        error: 'Deposit not found',
      };
    }

    await deposit.destroy();
    return {
      message: SUCCESSFUL,
      payload: 'Deposit entry deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting deposit entry:', error);
    return {
      message: 'An error occurred while deleting the deposit entry',
      error: error?.message,
    };
  }
};
