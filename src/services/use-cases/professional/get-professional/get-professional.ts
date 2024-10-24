import type { Professional } from "@prisma/client"
import type { ProfessionalRepository } from "@/repositories/professional-repository"
import { ResourceWasNotFoundedError } from "@/services/errors/resource-not-available-error"

export class GetProfessionalUseCase {
  constructor(private professionalRepository: ProfessionalRepository) {}

  async getProfessional(id: string): Promise<Professional | null> {
    const professional = await this.professionalRepository.findByID(id)

    if (!professional) throw new ResourceWasNotFoundedError()

    return professional
  }
}