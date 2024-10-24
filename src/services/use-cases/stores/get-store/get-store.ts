import type { MechanicShopRepository } from "@/repositories/mechanic-shop-repository"
import { ResourceWasNotFoundedError } from "@/services/errors/resource-not-available-error"
import type { GetStoreRequest } from "@/types/interfaces"

export class GetStoreUseCase {
  constructor(private getStoreRepository: MechanicShopRepository) { }

  async findStore(name: string) {
    const handleGetStore = await this.getStoreRepository.findByName(name)

    if (!handleGetStore) throw new ResourceWasNotFoundedError()

    return handleGetStore
  }
}