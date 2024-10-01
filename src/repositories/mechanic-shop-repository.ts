import type { MechanicShopInterface, StoreWithoutID } from "@/types/interfaces"

export interface MechanicShopRepository {
  create({ id, name, adress }: MechanicShopInterface): Promise<MechanicShopInterface>
  findByID(id: string): Promise<StoreWithoutID | null>
  findAll(): Promise<StoreWithoutID[] | null>
}