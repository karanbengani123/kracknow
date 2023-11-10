import { APIGatewayProxyEvent } from 'aws-lambda'

export const attachAuthorizerInfo = (event: APIGatewayProxyEvent) => {
  return (...parameters: any[]) => {
    if (event.requestContext.authorizer) {
      parameters[0].user = event.requestContext.authorizer
    }
    parameters[2]()
  }
}
