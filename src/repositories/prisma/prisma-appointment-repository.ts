import { prisma } from "@/lib/prisma"
import type { AppointmentResponse } from "@/types/interfaces"
import type { Prisma } from "@prisma/client"
import type { AppointmentRepository } from "../appointment-repository"

export class PrismaAppointmentRepository implements AppointmentRepository {

  async findDuplicateAppointment(customerId: string,
    professionalId: string,
    service: string,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    appointmentTime: Date): Promise<any> {
    return await prisma.appointment.findFirst({
      where: {
        customerId: customerId,
        professionalId: professionalId,
        service: service,
        appointmentTime: appointmentTime
      }
    })

  }


  async createAppointment(data: Prisma.AppointmentCreateInput): Promise<AppointmentResponse> {
    const scheduleAppointment = await prisma.appointment.create({
      data: {
        id: data.id,
        customer: data.customer,
        professional: data.professional,
        store: data.store,
        appointmentTime: data.appointmentTime,
        created_at: data.created_at,
        expiresAt: data.expiresAt,
        service: data.service
      },
      include: {
        professional: true,
        store: true,
      }
    })

  
    const scheduleData = {
      id: scheduleAppointment.id,
      appointmentTime: scheduleAppointment.appointmentTime,
      expiresAt: scheduleAppointment.expiresAt,
      service: scheduleAppointment.service,
      customerId: scheduleAppointment.customerId,
      professionalName: scheduleAppointment.professional.name,
      storeName: scheduleAppointment.store.name,
    }

    return {
      scheduleData
    }
  }

}