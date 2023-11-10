export function Ok (message: any) {
  return {
    body: JSON.stringify({
      message
    }),
    statusCode: 200
  }
}

export function BadRequest (message: string) {
  return {
    body: JSON.stringify({
      message
    }),
    statusCode: 400
  }
}

export function InternalServerError (error: Error) {

  return {
    body: JSON.stringify({
      message: error.message,
      stack: error.stack
    }),
    statusCode: 500
  }
}
