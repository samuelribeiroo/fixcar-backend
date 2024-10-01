import type { MechanicShopRepository } from "@/repositories/mechanic-shop-repository"
import { ResourceWasNotFoundedError } from "@/services/errors/resource-not-available-error"

export class GetStoreUseCase {
  constructor(private getStoreRepository: MechanicShopRepository) { }

  async findAllMechanics() {
    const handleGettALL = await this.getStoreRepository.findAll()

    if (!handleGettALL) throw new ResourceWasNotFoundedError()

    return handleGettALL
  }
}