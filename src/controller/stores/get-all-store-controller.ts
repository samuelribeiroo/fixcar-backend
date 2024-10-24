import { PrismaMechanicRepository } from "@/repositories/prisma/prisma-mechanic-repository";
import { ResourceWasNotFoundedError } from "@/services/errors/resource-not-available-error";
import { GetStoreUseCase } from "@/services/use-cases/stores/get-all-stores/get-all-stores"
import type { FastifyReply, FastifyRequest } from "fastify"

export async function getAllMechanicShops(request: FastifyRequest, reply: FastifyReply) {

  try {
    const prismaRepo = new PrismaMechanicRepository()
    const getAll = new GetStoreUseCase(prismaRepo)

    const find = await getAll.findAllMechanics()

    reply.status(200).send({ stores: find })
  } catch (error) {
    // biome-ignore lint/correctness/noUnreachable: <explanation>
    if (error instanceof ResourceWasNotFoundedError) {
      reply.status(404).send({ message: error.message })
    }

    reply.status(500)
  }
}