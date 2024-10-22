import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages';
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams';
import { KeyValue, User, Student } from '../../../../shared/database/models';
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound';
import {
  RUPEE_TO_COIN_KEY,
} from '../../../../shared/constants/message';

export const getNewConversionRate = async (params: IControllerParams<null>) => {
  // Check if the user exists in the User table
  const admin = await User.findByPk(params.user.id);
  
  // Check if the user exists in the Student table
  const student = await Student.findByPk(params.user.id);

  if (!admin && !student) {
    throw new HttpNotFound('User not found');
  }

  const amount = await KeyValue.findByPk(RUPEE_TO_COIN_KEY);

  if (!amount) {
    throw new HttpNotFound('Conversion rate not found');
  }

  let conversionRate = null;
  if (amount.stringValue) {
    conversionRate = JSON.parse(amount.stringValue);
  }

  return {
    message: SUCCESSFUL,
    payload: conversionRate,
  };
};
