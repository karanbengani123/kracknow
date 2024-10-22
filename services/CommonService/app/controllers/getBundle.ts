import { IControllerParams } from '../../../../shared/interfaces/IControllerParams';
import { Bundle } from '../../../../shared/database/models';
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound';
import { NOT_FOUND } from '../../../../shared/constants/httpErrorMessages';

export const getBundle = async (params: IControllerParams<{ id: string }>) => {
  const { id } = params.input; // Get the ID from input

  const bundle = await Bundle.findByPk(id);

  if (!bundle) {
    throw new HttpNotFound(NOT_FOUND);
  }

  return {
    payload: {
      bundle,
    },
  };
};
