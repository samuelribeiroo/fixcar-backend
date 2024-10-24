import type { MechanicShopRepository } from "@/repositories/mechanic-shop-repository"
import type { MechanicShopInterface } from "@/types/interfaces";

export class StoreRegisterUseCase {
  constructor(private meachanicRepository: MechanicShopRepository) { }

  async create({ name, id, adress }: MechanicShopInterface) {
    const store = await this.meachanicRepository.create({
      name, id, adress
    })

    return store
  }
}