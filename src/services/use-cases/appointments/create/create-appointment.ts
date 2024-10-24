import type { AppointmentInMemoryInterface } from "@/repositories/appointment-repository"
import { ScheduleNotAvailableError } from "@/services/errors/schedule-appointment-error"
import type { AppointmentResponse } from "@/types/interfaces"

export class AppointmentUseCase {
  constructor(private appointmentRepository: AppointmentInMemoryInterface) { }

  async createAppointment({
    customerId,
    appointmentTime,
    expiresAt,
    id,
    professionalName,
    service,
    storeName
  }: AppointmentResponse) {

    const isAlreadyCreatedAppointment = await this.appointmentRepository.findDuplicateAppointment(
      customerId,
      professionalName,
      service,
      appointmentTime
    )

    if (isAlreadyCreatedAppointment) {
      throw new ScheduleNotAvailableError()
    }

    const scheduling = await this.appointmentRepository.createAppointment({
      id,
      customerId,
      appointmentTime,
      expiresAt,
      professionalName,
      service,
      storeName
    })

    return scheduling
  }
}

