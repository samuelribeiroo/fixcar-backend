import { EmailAlreadyUse } from "@/services/errors/email-in-use-error"
import makeRegisterCustomerUseCase from "@/services/factories/make-register-customer-service"
import { registerCustomerSchema } from "@/types/types-safe"
import type { FastifyReply, FastifyRequest } from "fastify"

export default async function register(request: FastifyRequest, reply: FastifyReply) {

  try {
    const registerNewCustomer = makeRegisterCustomerUseCase()

    const { name, email, password } = registerCustomerSchema.parse(request.body)

    await registerNewCustomer.create({
      name,
      email,
      password
    })


    return reply.status(201).send({ success: true })

  } catch (error) {
    if (error instanceof EmailAlreadyUse) {
      reply.status(409).send({ message: error.message })
    }

    reply.status(500)
  }

}