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