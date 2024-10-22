/* eslint-disable no-undef */
import { FindOptions, Op } from 'sequelize';
import { NOT_FOUND } from '../../../../shared/constants/httpErrorMessages';
import { Bundle } from '../../../../shared/database/models';
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound';
import { parseLimitOffsetFromRequest } from '../../../../shared/helpers/parseLimitOffsetFromRequest';
import { queryLikeString } from '../../../../shared/helpers/string';
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams';

export const getAllBundle = async (params: IControllerParams<null>) => {
  const filterParams = params.args.queryString;

  const queryParams: FindOptions = {
    attributes: ['uuid', 'bundle_name', 'amount_coins', 'amount_rupees', 'status', 'deletedAt'],
  };

  let where: any = {};

  if (filterParams.q) {
    where.bundle_name = { [Op.like]: queryLikeString(filterParams.q) };
  }

  queryParams.where = where;

  if (filterParams.limit) {
    const { limit, offset } = parseLimitOffsetFromRequest(filterParams as { limit: any, page: any });
    queryParams.limit = limit;
    queryParams.offset = offset;
  }

  try {
    const lists = await Bundle.findAndCountAll(queryParams);

    if (!lists) {
      throw new HttpNotFound('Bundle ' + NOT_FOUND);
    }

    return {
      payload: {
        lists,
      },
    };
  } catch (error) {
    console.error('Error fetching bundles:', error);
    throw new HttpNotFound('An error occurred while fetching bundles');
  }
};

