import { prisma } from "@/lib/prisma"
import type { Prisma, Professional } from "@prisma/client"
import type { ProfessionalRepository } from "../professional-repository"

export class PrismaProfessionalRepository implements ProfessionalRepository {
  async create(data: Prisma.ProfessionalCreateInput): Promise<Professional> {

    const mechanic = await prisma.professional.create({
      data
    })

    return mechanic
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async findByName(name: string): Promise<any> {
    return await prisma.professional.findFirst({
      where: {
        name
      }
    })
  }

  async findByID(id: string): Promise<Professional | null> {
    const handleGetProfessional = await prisma.professional.findUnique({
      where: {
        id
      }
    })

    return handleGetProfessional
  }
}