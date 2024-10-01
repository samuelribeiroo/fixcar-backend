import type { MechanicShopRepository } from "@/repositories/mechanic-shop-repository"
import { ResourceWasNotFoundedError } from "@/services/errors/resource-not-available-error"
import type { GetStoreRequest } from "@/types/interfaces"

export class GetStoreUseCase {
  findAllMechanics() {
    throw new Error("Method not implemented.")
  }
  constructor(private getStoreRepository: MechanicShopRepository) { }

  async findStore({ storeID }: GetStoreRequest) {
    const handleGetStore = await this.getStoreRepository.findByID(storeID)

    if (!handleGetStore) throw new ResourceWasNotFoundedError()

    return handleGetStore
  }
}