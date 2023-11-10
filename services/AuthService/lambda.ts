import { APIGatewayProxyEvent, APIGatewayProxyHandler, Context } from 'aws-lambda'
import ServerlessHttp from 'serverless-http'
import app from './app'
import router from './app/api'
import { instance, loadDatabase } from "../../shared/database/sequelize";
import { init } from '../../shared/database/models';

// Create a lambda compatible serverless express app
const serverLessApp = ServerlessHttp(app, { callbackWaitsForEmptyEventLoop: false })

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context: Context) => {
  // Sync the database if it was told explicitly
  console.log('========>',instance)
  if (!instance.connection) {
    console.log("No connection exists");
    instance.connection = await loadDatabase();
  } else {
    console.log("Connection exists");
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

  app.use('/', router)

  return serverLessApp(event, context)
}
