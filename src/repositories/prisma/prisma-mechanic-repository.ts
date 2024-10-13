import { prisma } from "@/lib/prisma"
import type { MechanicShopInterface, StoreWithoutID } from "@/types/interfaces"
import type { MechanicShop } from "@prisma/client"
import type { MechanicShopRepository } from "../mechanic-shop-repository"
import { string } from "zod"


export class PrismaMechanicRepository implements MechanicShopRepository {
  async create({ name, id, adress }: MechanicShopInterface): Promise<MechanicShop> {
    return await prisma.mechanicShop.create({
      data: {
        name,
        id,
        adress
      }
    })
  }

  async findByName(name: string): Promise<StoreWithoutID | null> {
    const store = await prisma.mechanicShop.findUnique({
      where: { name }, 
      select: { name: true, adress: true },
    })

    if (!store) {
      return null
    }

    const mechanic: StoreWithoutID = {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      name: store!.name,
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      adress: store!.adress
    }


    return {
      name: mechanic.name,
      adress: mechanic.adress
    }
  }


  async findAll(): Promise<StoreWithoutID[]> {
    return await prisma.mechanicShop.findMany({
      select: {
        id: false,
        name: true,
        adress: true
      }
    })
  }
}