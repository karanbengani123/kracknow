import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages';
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams';
import { BankAccount, User } from '../../../../shared/database/models';
import { ONLY_ADMIN_ALLOWED } from '../../../../shared/constants/message';
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound';
import { Op } from 'sequelize';

export const changeUpiActiveStatus = async (params: IControllerParams<{ userId: number; isActive: boolean }>) => {
  try {

    const { userId, isActive }: any = params.input;
    const admin = await User.findByPk(params.user.id);
    if (!admin) {
      throw new HttpNotFound(ONLY_ADMIN_ALLOWED);
    }
    
    // Find the user by userId
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return {
        message: 'User not found',
        error: 'User not found',
      };
    }

    await BankAccount.update(
        { isActive: false },
        {
          where: {
            userId,
            id: { [Op.ne]: userId },
          },
        }
      );

    // Update the isActive status
    user.isActive = isActive;
    await user.save();

    return {
      message: SUCCESSFUL,
      payload: 'User status updated successfully',
    };
  } catch (error) {
    console.error('Error changing user status:', error);
    return {
      message: 'An error occurred while changing user status',
      error: error.message,
    };
  }
};
