import { PrismaCustomerRepository } from "@/repositories/prisma/prisma-customer-repository"
import { ResourceWasNotFoundedError } from "@/services/errors/resource-not-available-error"
import { GetCustomerUseCase } from "@/services/use-cases/user/get-user/get-user"
import type { FastifyReply, FastifyRequest } from "fastify"


export default async function search(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  try {
    const prismaCustomerRepository = new PrismaCustomerRepository()
    const getCustomer = new GetCustomerUseCase(prismaCustomerRepository)

    const { id } = request.params

    const customerData = await getCustomer.findUser({ customerID: id })

    reply.status(200).send({ costumer: customerData })

  } catch (error) {
    if (error instanceof ResourceWasNotFoundedError) {
      reply.status(404).send({ message: error.message })
    }

   reply.status(500)
  }
}