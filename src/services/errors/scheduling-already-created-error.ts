export class ScheduleConflictedError extends Error {
  constructor() {
    super(`Schedule already made it. - It's not possible schedule two appointments at same time.`)
  }
}