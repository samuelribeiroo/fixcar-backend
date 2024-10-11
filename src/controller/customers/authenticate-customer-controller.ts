import { InvalidCredentialsError } from "@/services/errors/credential-are-invalid-error"
import type { AuthRequestBody } from "@/types/interfaces"
import type { FastifyReply, FastifyRequest } from "fastify"
import makeAuthenticateUseCase from '@/services/factories/make-authenticate-customer'

export default async function authCostumer(request: FastifyRequest<{ Body: AuthRequestBody }>, reply: FastifyReply) {
  try {
    const { email, password } = request.body

    const authenticateUseCase = makeAuthenticateUseCase()

    await authenticateUseCase.auth({
      email,
      password
    })

    return reply.status(204).send()
  } catch (error) {

    if (error instanceof InvalidCredentialsError) {
      reply.status(404)
    }

    reply.status(500)
  }
}
