export const lambdaSuccessResponse = (body: {[key: string]: any}) => ({
  body: JSON.stringify(body),
  statusCode: 200
})
