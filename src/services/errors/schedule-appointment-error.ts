export class ScheduleNotAvailableError extends Error {
  constructor() {
    super(`Your request is missing informarions.
Please, correct and try again all fields are required.`)
  }
}