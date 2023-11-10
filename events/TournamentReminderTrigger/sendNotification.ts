import AWS from 'aws-sdk'

export const sendMessageToClient = async (connectionId, payload) =>
  new Promise((resolve, reject) => {
    try {
      const apigatewaymanagementapi = new AWS.ApiGatewayManagementApi({
        endpoint: process.env.END_POINT,
        region: process.env.AWS_S3_REGION

      })
      apigatewaymanagementapi.postToConnection(
        {
          ConnectionId: connectionId, // connectionId of the receiving ws-client
          Data: JSON.stringify(payload)
        },
        (err, data) => {
          if (err) {
            console.log('err is', err)
            reject(err)
          }
          resolve(data)
        }
      )
    } catch (err) {
      console.log("sendmessagetoclient error *************", err)
    }
  })
