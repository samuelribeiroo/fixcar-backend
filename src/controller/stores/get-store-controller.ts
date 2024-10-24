import { PrismaMechanicRepository } from "@/repositories/prisma/prisma-mechanic-repository"
import { ResourceWasNotFoundedError } from "@/services/errors/resource-not-available-error"
import { GetStoreUseCase } from "@/services/use-cases/stores/get-store/get-store"
import type { FastifyReply, FastifyRequest } from "fastify"

export default async function getStore(request: FastifyRequest<{ Params: { name: string } }>, reply: FastifyReply) {
  try {
    const prismaCustomerRepository = new PrismaMechanicRepository()
    const getMechanicShop = new GetStoreUseCase(prismaCustomerRepository)

    const mechanicShopTitle = request.params.name

    const store = await getMechanicShop.findStore(mechanicShopTitle)

    reply.status(200).send(store)

  } catch (error) {
    // biome-ignore lint/correctness/noUnreachable: <explanation>
    if (error instanceof ResourceWasNotFoundedError) {
      reply.status(404).send({ message: error.message })
    }

    reply.status(500)
  }
}