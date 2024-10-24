import { ScheduleNotAvailableError } from '@/services/errors/schedule-appointment-error'
import { ScheduleConflictedError } from '@/services/errors/scheduling-already-created-error'
import makeAppointment from '@/services/factories/make-appointments-factory'
import type { ErrorResponse } from '@/types/interfaces'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type { AppointmentResponse } from "@/types/interfaces"

export default async function createAppointment(request: FastifyRequest, reply: FastifyReply): Promise<AppointmentResponse> {
  try {
    const makeAppointments = makeAppointment()

    const { customerId, professionalId, storeId, appointmentTime, service } = request.body as {
      customerId: string,
      professionalId: string,
      storeId: string,
      appointmentTime: string,
      service: string
    }

    if (!customerId || !professionalId || !storeId || !appointmentTime) {
      throw new ScheduleNotAvailableError()
    }

    const appointmentDate = new Date(appointmentTime)

    // Logic to turn scheduling valid for 2 hours.
    const expiresAt = new Date(appointmentDate.getTime() + 2 * 60 * 60 * 1000) // 2 hours.

    // If to found any registry already created. The error 'ScheduleNotAvailable Error' be thrown. 
    // The reason accordingly with application rules is: A customer shouldn't can create two appointments at same time with same professional, schedule and shop.
   
    const isAlreadyCreatedAppointment = await makeAppointments.findFirst({
      where: {
        customerId: customerId,
        professionalId: professionalId,
        service: service,
        appointmentTime: appointmentDate
      }
    })

    if (isAlreadyCreatedAppointment) {
      throw new ScheduleConflictedError()
    }

    const schedule = await makeAppointments.create({
      data: {
        appointmentTime: appointmentDate,
        expiresAt: expiresAt,
        service: service,
        customer: { connect: { id: customerId } },
        professional: { connect: { id: professionalId } },
        store: { connect: { id: storeId } },
      },
    })


    const fullAppointment = await makeAppointments.findUnique({
      where: {
        id: schedule.id,
      },

      // Here we can use includes, will be working well without any problem.
      // But to increase performance I choosed use it select rather than include 
      // (select -> one query and bring the specific information / include -> load all data from registry)

      select: {
        id: true,
        appointmentTime: true,
        expiresAt: true,
        service: true,
        customerId: true,
        professional: {
          select: {
            name: true,
          },
        },
        store: {
          select: {
            name: true,
          },
        },
      },
    })


    return reply.status(201).send({
      id: fullAppointment?.id,
      appointmentTime: fullAppointment?.appointmentTime,
      expiresAt: fullAppointment?.expiresAt,
      service: fullAppointment?.service,
      customerId: fullAppointment?.customerId,
      professionalName: fullAppointment?.professional.name,
      storeName: fullAppointment?.store.name,
    })

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (error: any) {
    
    //  Dictionary/Map Pattern and Eearly Return
    // I could it use a conditional structure here? For sure. 
    // But to purposes of learning I choose adopt this approach. 

    const possibleErrorType: { [key: string]: ErrorResponse } = {
      ScheduleNotAvailableError: { status: 400 },
      ScheduleConflictedError: { status: 400 }
    }

    const { name } = error.constructor

    const response = possibleErrorType[name] || { status: 500 }

    return reply.status(response.status).send(error.message || 'Internal Server Error')
  }
}
