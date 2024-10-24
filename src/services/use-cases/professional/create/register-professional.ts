import type { ProfessionalRepository } from "@/repositories/professional-repository"
import { ProfessionalRegisteredError } from "@/services/errors/professional-already-registered-error"
import type { ProfessionalCreateRequest } from "@/types/interfaces"
import type { Professional } from "@prisma/client"

export class RegisterProfessionalUseCase {
  constructor(private professionalRepository: ProfessionalRepository) { }

  async create({ name, id, shopID }: ProfessionalCreateRequest): Promise<Professional> {
    const doesAlreadyExistProfessional = await this.professionalRepository.findByName(name)

    if (doesAlreadyExistProfessional) throw new ProfessionalRegisteredError()
    
    const professional = await this.professionalRepository.create({
      name,
      id,
      mechanicShop: {
        connect: { id: shopID }
      }
    })

    return professional
  }
}