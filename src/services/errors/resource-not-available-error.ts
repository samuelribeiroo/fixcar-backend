export class ResourceWasNotFoundedError extends Error {
  constructor() {
    super('Resource requested is not available.')
  }
}