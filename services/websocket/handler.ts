import {
  APIGatewayEventRequestContext as LambdaContext,
  APIGatewayProxyEvent as LambdaEvent
} from 'aws-lambda'
import { verifyToken } from './verifyToken'
import { UserDeviceToken } from '../../shared/database/models'
import { APIGatewayProxyEventExtended as Extended } from './types'
/**
 * The handler is called when a client connects/disconnects to websocket
 * @param event
 */
export const connectionHandler = async (event: LambdaEvent, context: LambdaContext) => {
  // Grab the connection id from the request
  const connectionId = event.requestContext.connectionId

  // tslint:disable-next-line: no-console
  console.log('Request Context', event.requestContext)
  // tslint:disable-next-line: no-console
  console.log('Event', event)
  // tslint:disable-next-line: no-console
  console.log('Context', context)

  // Handle client connection
  if (event.requestContext.eventType === 'CONNECT') {
    const { id } = event.requestContext.authorizer

    await UserDeviceToken.create({
      type: 'WEBSOCKET',
      token: connectionId,
      userId: id
    })
  } else if (event.requestContext.eventType === 'DISCONNECT') { // Handle disconnection
    await UserDeviceToken.destroy({
      where: {
        token: connectionId
      },
      force: true
    })
  } else {
    return response(400)
  }
  return response(200)
}

function response (code: number) {
  return {
    statusCode: code
  }
}
/**
 * The handler authorizes every new connection to the websocket
 * Every connection should pass a Auth header
 * @param event
 */
export const authHandler = async (event: LambdaEvent & Extended, context: any) => {
  // tslint:disable-next-line: no-console
  console.log('Event', event)
  // tslint:disable-next-line: no-console
  console.log('Context', context)

  if (!event.queryStringParameters.Auth) {
    // tslint:disable-next-line: no-console
    console.debug('Unauthorized', 'Token not found')
    return fail(context, 'Unauthorized')
  }

  let userInfo: any | null
  try {
    const info: any = await verifyToken(event.queryStringParameters.Auth)
    // tslint:disable-next-line: no-console
    console.info('Info', info)

    userInfo = { id: info.id }

    // tslint:disable-next-line: no-console
    console.debug('---------------Allow--------------')
    return context.succeed(generateAllow('me', event.methodArn, userInfo))
  } catch (e) {
    // tslint:disable-next-line: no-console
    fail(context, e)
  }
}

function fail (context, message: string) {
  return context.fail(message)
}
/**
 * Default connection handler for unhandled routes
 */
export const defaultHandler = async (event: any, context: any, callback: any) => {
  // tslint:disable-next-line: no-console
  console.log(event, context)
  callback(null)
}

// Help function to generate an IAM policy
function generatePolicy (principalId: any, effect: any, resource: any, info: any) {
  // Required output:
  const authResponse: any = {}
  authResponse.principalId = principalId
  if (effect && resource) {
    const policyDocument: any = {}
    policyDocument.Version = '2012-10-17'
    policyDocument.Statement = []
    const statementOne: any = {}
    statementOne.Action = 'execute-api:Invoke'
    statementOne.Effect = effect
    statementOne.Resource = resource
    policyDocument.Statement[0] = statementOne
    authResponse.policyDocument = policyDocument
  }
  authResponse.context = info
  return authResponse
}

function generateAllow (principalId: any, resource: any, info: any) {
  return generatePolicy(principalId, 'Allow', resource, info)
}
