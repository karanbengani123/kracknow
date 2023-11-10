import { AuthorizationData } from "aws-sdk/clients/ecr";
import BlockedToken from "../../shared/database/models/BlockedToken";
import { logger } from "../../shared/lib/system/logger";
import { Access } from "./enums/Access";
import { generatePolicy } from "./generatePolicy";
import { ITokenData } from "./interfaces/ITokenData";
import { verifyToken } from "./verifyToken";
import { init } from "../../shared/database/models";
import { instance, loadDatabase } from "../../shared/database/sequelize";

/**
 * The method is called by API Gatewway to authenicate API calls.
 * @param event
 */
export const handler = async (
  event: AuthorizationData & { methodArn: string }
) => {
  if (!instance.connection) {
    // console.log("No connection exists");
    instance.connection = await loadDatabase();
  } else {
    // console.log("Connection exists");
    // restart connection pool to ensure connections are not re-used across invocations
    instance.connection.connectionManager.initPools();

    // restore `getConnection()` if it has been overwritten by `close()`
    if (
      Object.prototype.hasOwnProperty.call(
        instance.connection.connectionManager,
        "getConnection"
      )
    ) {
      delete instance.connection.connectionManager.getConnection;
    }
  }

  init(instance.connection);
  logger.info("Event", event);
  const token = event.authorizationToken;
  let info: ITokenData;
  try {
    info = await verifyToken(token.slice(7, token.length));
    logger.info("Verification Success", info);

    const isBlocked = await BlockedToken.findOne({
      where: { token },
    });

    logger.info("Blocked Token", isBlocked);

    if (isBlocked) {
      logger.info("Blocked Token", token);
      throw new Error("The token is blocked");
    }
  } catch (e) {
    throw new Error("Unauthorized");
  } finally {
    // console.log("Closing connection");
    await instance.connection.connectionManager.close();
  }

  return generatePolicy(info.id, Access.Allow, "*", info);
};
