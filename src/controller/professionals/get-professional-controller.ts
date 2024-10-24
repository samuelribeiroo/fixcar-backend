import { PrismaProfessionalRepository } from "@/repositories/prisma/prisma-professional-repository"
import { ResourceWasNotFoundedError } from "@/services/errors/resource-not-available-error"
import { GetProfessionalUseCase } from "@/services/use-cases/professional/get-professional/get-professional"
import type { FastifyReply, FastifyRequest } from "fastify"

export default async function searchProfessional(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  try {
    const prismaCustomerRepository = new PrismaProfessionalRepository()
    const professionalService = new GetProfessionalUseCase(prismaCustomerRepository)

    const { id } = request.params

    const professionalData = await professionalService.getProfessional(id)

    reply.status(200).send({ professional: professionalData })

  } catch (error) {
    if (error instanceof ResourceWasNotFoundedError) {
      reply.status(404).send({ message: error.message })
    }

   reply.status(500)
  }
}