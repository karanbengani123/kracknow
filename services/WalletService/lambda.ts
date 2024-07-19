// import {
//   APIGatewayProxyEvent,
//   APIGatewayProxyHandler,
//   Context,
// } from "aws-lambda";
// import ServerlessHttp from "serverless-http";
// import { init } from "../../shared/database/models";
// import app from "./app";
// import router from "./app/api";
// import { instance, loadDatabase } from "../../shared/database/sequelize";
// // const expressApp = require("express")();

// // Create a lambda compatible serverless express app
// const serverLessApp = ServerlessHttp(app, {
//   callbackWaitsForEmptyEventLoop: false,
// });

// export const handler: APIGatewayProxyHandler = async (
//   event: APIGatewayProxyEvent,
//   context: Context
// ) => {
//   if (!instance.connection) {
//     console.log("No connection exists");
//     instance.connection = await loadDatabase();
//   } else {
//     // restart connection pool to ensure connections are not re-used across invocations
//     instance.connection.connectionManager.initPools();

//     // restore `getConnection()` if it has been overwritten by `close()`
//     if (
//       Object.prototype.hasOwnProperty.call(
//         instance.connection.connectionManager,
//         "getConnection"
//       )
//     ) {
//       delete instance.connection.connectionManager.getConnection;
//     }
//   }

//   init(instance.connection);
//   app.use("/", router);

//   return serverLessApp(event, context);
// };

// import {
//   APIGatewayProxyEvent,
//   APIGatewayProxyHandler,
//   APIGatewayProxyResult,
//   Context,
// } from "aws-lambda";
// import ServerlessHttp from "serverless-http";
// import { init } from "../../shared/database/models";
// import app from "./app";
// import router from "./app/api";
// import { instance, loadDatabase } from "../../shared/database/sequelize";

// // Create a lambda-compatible serverless express app
// const serverLessApp = ServerlessHttp(app, {
//   callbackWaitsForEmptyEventLoop: false,
// });

// export const handler: APIGatewayProxyHandler = async (
//   event: APIGatewayProxyEvent,
//   context: Context
// ): Promise<APIGatewayProxyResult> => {
//   var response: APIGatewayProxyResult;

//   try {
//     if (!instance.connection) {
//       console.log("No connection exists");
//       instance.connection = await loadDatabase();
//     } else {
//       // restart connection pool to ensure connections are not re-used across invocations
//       instance.connection.connectionManager.initPools();

//       // restore `getConnection()` if it has been overwritten by `close()`
//       if (Object.prototype.hasOwnProperty.call(instance.connection.connectionManager,"getConnection")) {
//         delete instance.connection.connectionManager.getConnection;
//       }}

//     init(instance.connection);
//     app.use("/", router);

//     response = await serverLessApp(event, context);

//     // Ensure the 'statusCode' property is present in the response
//     if (!("statusCode" in response)) {
//       throw new Error('Invalid response format: missing "statusCode" property');
//     }
//   } catch (error) {
//     console.error(error);
//     response = {
//       statusCode: 500,
//       body: JSON.stringify({ error: "Internal Server Error" }),
//     };
//   }

//   // Use a type assertion to satisfy TypeScript
//   return response as APIGatewayProxyResult;
// };

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import ServerlessHttp from "serverless-http";
import { init } from "../../shared/database/models";
import app from "./app";
import router from "./app/api";
import { instance, loadDatabase } from "../../shared/database/sequelize";

// Create a lambda-compatible serverless express app
const serverLessApp = ServerlessHttp(app, {
  callbackWaitsForEmptyEventLoop: false,
});

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    if (!instance.connection) {
      console.log("No connection exists");
      instance.connection = await loadDatabase();
    } else {
      // restart connection pool to ensure connections are not re-used across invocations
      instance.connection.connectionManager.initPools();

      // restore `getConnection()` if it has been overwritten by `close()`
      if (Object.prototype.hasOwnProperty.call(instance.connection.connectionManager, "getConnection")) {
        delete instance.connection.connectionManager.getConnection;
      }
    }

    init(instance.connection);
    app.use("/", router);

    const response = await serverLessApp(event, context);

    // Check if the 'statusCode' property is present in the response
    if (!("statusCode" in response)) {
      throw new Error('Invalid response format: missing "statusCode" property');
    }

    // Explicitly cast 'response' to 'APIGatewayProxyResult'
    return response as APIGatewayProxyResult;
  } catch (error) {
    console.error(error);

    // Return a default error response
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};

