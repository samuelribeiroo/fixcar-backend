export class InvalidCredentialsError extends  Error {
  constructor() {
    super('The credentials are invalid.')
  }
}