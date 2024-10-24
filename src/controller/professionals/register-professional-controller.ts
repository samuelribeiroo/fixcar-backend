import { ProfessionalRegisteredError } from "@/services/errors/professional-already-registered-error"
import makeRegisterProfessionalUseCase from "@/services/factories/make-register-professional"
import type { FastifyReply, FastifyRequest } from "fastify"

export default async function registerProfessional(request: FastifyRequest, reply: FastifyReply) {
  try {
    const registerNewProfessional = makeRegisterProfessionalUseCase()

    const { name, id, shopID } = request.body as { name: string, id: string, shopID: string }

    await registerNewProfessional.create({
      name, id, shopID
    })

    return reply.status(201).send({ sucess: true })
  } catch (error) {
    if (error instanceof ProfessionalRegisteredError) {
      reply.status(404).send({ message: error.message })
    }

    reply.status(500)
  }
}