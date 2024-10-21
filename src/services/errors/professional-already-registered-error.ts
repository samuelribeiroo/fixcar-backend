export class ProfessionalRegisteredError extends Error {
  constructor() {
    super('The profissional already registered.')
  }
}