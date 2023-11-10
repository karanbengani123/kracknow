export class HttpForbidden extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'HttpForbidden'
  }
}
