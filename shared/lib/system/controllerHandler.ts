/* eslint-disable no-prototype-builtins */
import { Request, Response } from "express";
import { Transaction } from "sequelize";
import { IControllerHandlerParams } from "../../interfaces/IControllerHandlerParams";
import { getTransaction } from "./generateControllerParams";
import { handleError } from "./handleError";
import { logger } from "./logger";
import { Created, download, Ok } from "./response";
import { validator } from "../validator";
import { instance } from "../../database/sequelize";

/**
 * Controller handler method which validates data with defined schema, call controller and
 * handles the exception.
 * @param param
 */
export const controllerHandler = ({ schema, controller, options }: IControllerHandlerParams) => {


  return async (req: Request, res: Response) => {
    let transaction: Transaction;
    try {
      let payload = {};

      payload = { ...(req.body ? req.body : {}), ...req.params };

      // Validate the user input
      if (schema) {
        await validator(schema, {
          body: req.body,
          query: req.query,
          path: req.params,
        });
      }

      // console.log('=====??????',req.body);

      let createTransaction = true;
      if (
        options &&
        options.hasOwnProperty("transaction") &&
        options.transaction === false
      ) {
        createTransaction = false;
      }

      if (createTransaction) {
        transaction = await getTransaction();
      }

      const user: { id?: string; type?: string } = {};
      if (
        (req as any).requestContext &&
        (req as any).requestContext.authorizer &&
        ((req as any).requestContext.authorizer.id ||
          (req as any).requestContext.authorizer.claims)
      ) {
        if ((req as any).requestContext.authorizer.claims) {
          (req as any).requestContext.authorizer.id = (
            req as any
          ).requestContext.authorizer.claims.id;
          (req as any).requestContext.authorizer.type = (
            req as any
          ).requestContext.authorizer.claims.type;
        }
        user.id = (req as any).requestContext.authorizer.id;
        if ((req as any).requestContext.authorizer.type) {
          user.type = (req as any).requestContext.authorizer.type;
        }
      }
      logger.debug("Logged in User", { user });

      let deviceType = "unknown";
      if (req.get("Cloudfront-Is-Desktop-Viewer") === "true") {
        deviceType = "WEB";
      }
      if (req.get("Cloudfront-Is-Mobile-Viewer") === "true") {
        deviceType = "MOBILE";
      }
      if (req.get("Cloudfront-Is-Tablet-Viewer") === "true") {
        deviceType = "TAB";
      }

      let remoteIp = req.get("X-Forwarded-For");
      if (remoteIp) {
        remoteIp = remoteIp.split(", ")[0];
      }
      // Call the controller method

      const params = {
        args: {
          params: req.params,
          queryString: req.query,
        },

        image: (req as any).file,
        deviceType,
        input: payload,
        remoteIp,
        token: req.get("Authorization"),
        transaction,
        user,
      };
      const response = await controller(params);

      if (
        options &&
        options.hasOwnProperty("download") &&
        options.download === true
      ) {
        logger.debug("Meta", response);
        download(res, response);
        return;
      }

      // Return response to the client
      const method = req.method === "POST" && response.created ? Created : Ok;
      method(res, response.message, response.payload);
    } catch (e) {
      if (transaction) {
        await transaction.rollback();
      }
      // tslint:disable-next-line: no-console
      // console.error(e); // Log the error for debugging purpose
      // console.log('----------------------',e)
      handleError(e, res);
    } finally {
      // console.log("Closing connection ==========>");
      await instance.connection.connectionManager.close();
    }
  };
};
