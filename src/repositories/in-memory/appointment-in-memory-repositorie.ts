import type { AppointmentInMemoryInterface } from "@/repositories/appointment-repository"
import type { AppointmentResponse } from "@/types/interfaces"

export class AppointmentInMemoryRepository implements AppointmentInMemoryInterface {
  private appointments: AppointmentResponse[] = []

  async createAppointment({
    customerId,
    appointmentTime,
    expiresAt,
    id,
    professionalName,
    service,
    storeName
  }: AppointmentResponse): Promise<AppointmentResponse> {

    const scheduleData = {
      id,
      customerId,
      appointmentTime,
      expiresAt,
      professionalName,
      service,
      storeName
    }

    this.appointments.push({
      id,
      customerId,
      appointmentTime,
      expiresAt,
      professionalName,
      service,
      storeName
    })

    return scheduleData
  }

  async findDuplicateAppointment(customerId: string, professionalName: string, service: string, appointmentTime: Date): Promise<AppointmentResponse> {
    const wasNotIsDuplicate = this.appointments.find(appointment => {
      appointment.customerId === customerId &&
        appointment.professionalName === professionalName &&
        appointment.service === service &&
        appointment.appointmentTime === appointmentTime
    })

    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    return wasNotIsDuplicate! || null
  }
}