export class ScheduleNotAvailableError extends Error {
  constructor() {
    super(`
     1. All fields are required.
     2. Schedule already made it. - It's not possible schedule two appointments at same time.
    `)
  }
}