import { randomUUID } from "node:crypto"
import type { MechanicShopInterface, StoreWithoutID } from "@/types/interfaces"
import type { MechanicShop, Prisma } from "@prisma/client"
import type { MechanicShopRepository } from "../mechanic-shop-repository"

export class MechanicShopInMemoryRepository implements MechanicShopRepository {
  public items: MechanicShop[] = []

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async create({ name, adress }: MechanicShopInterface): Promise<MechanicShopInterface> {
    const store = {
      name,
      id: randomUUID(),
      adress
    }

    this.items.push(store)

    return store
  }

  async findByID(id: string): Promise<MechanicShop | null> {
    const store = this.items.find(item => item.id === id)

    if (!store) return null

    return store
  }

  async findAll(): Promise<StoreWithoutID[] | null> {
    // biome-ignore lint/suspicious/noSelfCompare: <explanation>
    const store = this.items.map(item => ({
      name: item.name,
      adress: item.adress
    }))

    if (!store || store.length === 0) {
      return Promise.reject(null)
    }

    return Promise.resolve(store)
  }
}

