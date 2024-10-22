import { IControllerParams } from '../../../../shared/interfaces/IControllerParams';
import { Bundle } from '../../../../shared/database/models';
import { IAddBundle } from '../interfaces/IAddBundle';
import { HttpBadRequest } from '../../../../shared/exceptions/HttpBadRequest';

export const addBundle = async (params: IControllerParams<IAddBundle>) => {
  const inputs = params.input;
  const transaction = params.transaction;

  // Check for existing bundle
  const existingBundle = await Bundle.findOne({
    where: {
      bundle_name: inputs.bundle_name,
    },
  });

  if (existingBundle) {
    throw new HttpBadRequest('Bundle name already exists');
  }

  // Set default status to 1 if not provided
  const status = inputs.status !== undefined ? inputs.status : 1;

  // Create a new bundle
  const newBundle = await Bundle.create(
    {
      bundle_name: inputs.bundle_name,
      amount_coins: inputs.amount_coins,
      amount_rupees: inputs.amount_rupees,
      status, // Include the status field
    },
    { transaction }
  );

  // Commit the transaction
  await transaction.commit();

  return {
    message: 'Bundle successfully created',
    payload: {
      bundle_name: newBundle.bundle_name,
      amount_coins: newBundle.amount_coins,
      amount_rupees: newBundle.amount_rupees,
      status: newBundle.status, // Include status in the response
    },
  };
};
