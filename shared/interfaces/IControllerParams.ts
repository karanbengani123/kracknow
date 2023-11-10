/* eslint-disable no-use-before-define */
import { Transaction } from 'sequelize'
import { IDynamicObject } from './IDynamicObject'
export interface IControllerParams<T> {
  args: {
    params: IDynamicObject;
    queryString: IDynamicObject;
  };
  image:IDynamicObject,
  deviceType: "WEB" | "MOBILE" | "TAB";
  input?: T;
  transaction: Transaction;
  token: string;
  remoteIp: string;
  user: IAuthorizedUser;
}

export interface IAuthorizedUser {
  id: string;
  role: string;
  type?: string;
}


