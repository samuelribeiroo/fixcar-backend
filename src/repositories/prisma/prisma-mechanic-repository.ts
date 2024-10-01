import { prisma } from "@/lib/prisma";
import type { MechanicShopInterface, StoreWithoutID } from "@/types/interfaces";
import type { MechanicShop } from "@prisma/client";
import type { MechanicShopRepository } from "../mechanic-shop-repository"

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

  async findByID(id: string): Promise<StoreWithoutID | null> {
    const store = await prisma.mechanicShop.findUnique({
      where: {
        id
      }
    })

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