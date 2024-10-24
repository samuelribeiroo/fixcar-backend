import type { AppointmentResponse } from "@/types/interfaces"
import type { Prisma } from "@prisma/client"

export interface AppointmentRepository {
  createAppointment(data: Prisma.AppointmentCreateInput): Promise<AppointmentResponse>
  findDuplicateAppointment(
    customerId: string,
    professionalId: string,
    service: string,
    appointmentTime: Date
  ): Promise<AppointmentResponse | null>
}

export interface AppointmentInMemoryInterface {
  createAppointment(data: AppointmentResponse): Promise<AppointmentResponse>
  findDuplicateAppointment(
    customerId: string,
    professionalName: string,
    service: string,
    appointmentTime: Date
  ): Promise<AppointmentResponse>
}