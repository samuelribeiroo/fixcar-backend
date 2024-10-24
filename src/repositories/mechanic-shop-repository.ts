import type { MechanicShopInterface, StoreWithoutID } from "@/types/interfaces"

export interface MechanicShopRepository {
  create({ id, name, adress }: MechanicShopInterface): Promise<MechanicShopInterface>
  findByName(name: string): Promise<StoreWithoutID | null>
  findAll(): Promise<StoreWithoutID[] | null>
}