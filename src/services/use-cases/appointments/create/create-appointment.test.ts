import { AppointmentInMemoryRepository } from "@/repositories/in-memory/appointment-in-memory-repositorie"
import { ScheduleNotAvailableError } from "@/services/errors/schedule-appointment-error"
import { ScheduleConflictedError } from "@/services/errors/scheduling-already-created-error"
import { beforeEach, describe, expect, it, vitest, } from "vitest"
import type { AppointmentInMemoryInterface } from "../../../../repositories/appointment-repository"
import { AppointmentUseCase } from "./create-appointment"

describe('Use Case: Create Appointment', () => {
  let inMemoryRepository: AppointmentInMemoryInterface
  let sut: AppointmentUseCase

  beforeEach(() => {
    vitest.clearAllMocks()
    inMemoryRepository = new AppointmentInMemoryRepository()
    sut = new AppointmentUseCase(inMemoryRepository)
  })

  it('should be possible create a appointment', async () => {
    const twoHours = 2 * 60 * 60 * 1000 // 2 hours.

    const appointmentData = {
      id: '7ecd5578-0030-4d23-ad34-1094681bf937',
      customerId: '4d0edbf2-ad01-4ac3-a49f-5274c116d713',
      professionalName: 'John Doe',
      storeName: 'Mechanic Shop 001',
      appointmentTime: new Date(),
      created_at: new Date(),
      expiresAt: new Date(Date.now() + twoHours), // Expires in 2 hours. 
      service: 'Service title example.',
    }

    const { id, customerId, professionalName, service, storeName, expiresAt, appointmentTime } = appointmentData

    // All data needed to make it assertion if the calculation of two hours it is correct. 
    // The time will be appear in milliseconds, so 2H -> 7200000 milliseconds

    const appointmentTimeAssertion = new Date()
    const expiresAtVerifier = new Date(appointmentTimeAssertion.getTime() + twoHours)

    await sut.createAppointment({
      id, customerId, professionalName, service, storeName, expiresAt: expiresAtVerifier, appointmentTime: appointmentTimeAssertion
    })

    expect(id).toEqual(expect.any(String))
    expect(appointmentTime).toEqual(expect.any(Date))
    expect(expiresAtVerifier.getTime() - appointmentTimeAssertion.getTime()).toBe(twoHours)

  })

  it('should be impossible create two appointments', async () => {
    const twoHours = 2 * 60 * 60 * 1000 // 2 hours.

    const appointmentData = {
      id: '7ecd5578-0030-4d23-ad34-1094681bf937',
      customerId: '4d0edbf2-ad01-4ac3-a49f-5274c116d713',
      professionalName: 'John Doe',
      storeName: 'Mechanic Shop 001',
      appointmentTime: new Date(),
      created_at: new Date(),
      expiresAt: new Date(Date.now() + twoHours), // Expires in 2 hours. 
      service: 'Service title example.',
    }

    const { id, customerId, professionalName, service, storeName, expiresAt, appointmentTime } = appointmentData

    try {
      expect(sut.createAppointment({ id, customerId, professionalName, service, storeName, expiresAt, appointmentTime }))

      throw new ScheduleNotAvailableError()

    } catch (error) {
      expect(error).toBeInstanceOf(ScheduleNotAvailableError)
    }
  })
})