export class EmailAlreadyUse extends Error {
  constructor() {
    super('E-mail is already in use.')
  }
}