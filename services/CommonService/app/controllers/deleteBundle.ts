import { IControllerParams } from '../../../../shared/interfaces/IControllerParams';
import { Bundle } from '../../../../shared/database/models';
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound';
import { NOT_FOUND } from '../../../../shared/constants/httpErrorMessages';

export const deleteBundle = async (params: IControllerParams<{id:string}>) => {
  const inputs = params.input;
  const transaction = params.transaction;

  // Find the bundle by primary key (UUID or ID)
  const bundle = await Bundle.findByPk(inputs.id);

  // Check if the bundle exists
  if (!bundle) {
    throw new HttpNotFound(NOT_FOUND);
  }

  // Soft delete the bundle (if using soft deletes)
  await bundle.destroy({ transaction });

  // Commit the transaction
  await transaction.commit();

  return {
    message: 'Bundle deleted successfully',
  };
};
