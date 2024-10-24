import { EmailAlreadyUse } from "@/services/errors/email-in-use-error"
import makeRegisterStoreUseCase from "@/services/factories/make-register-store"
import type { FastifyReply, FastifyRequest } from "fastify"

export default async function createStore(request: FastifyRequest, reply: FastifyReply) {

  try {
    const newStore = makeRegisterStoreUseCase()

    const { id, name, adress } = request.body as { id: string, name: string, adress: string }

    await newStore.create({
      id, name, adress
    })

    return reply.status(201).send({ success: true })
  } catch (error) {
    if (error instanceof EmailAlreadyUse) {
      reply.status(409).send({ message: error.message })
    }

    reply.status(500)
  }

}