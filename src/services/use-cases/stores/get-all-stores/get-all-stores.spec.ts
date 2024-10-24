import { randomUUID } from "node:crypto"
import { MechanicShopInMemoryRepository } from "@/repositories/in-memory/mechanic-shop-in-memory-repository"

import { beforeEach, describe, expect, it, vitest } from "vitest"
import { GetStoreUseCase } from "./get-all-stores"

describe('Use Case: Get all Store', () => {
  beforeEach(() => vitest.clearAllMocks())
  
  let sut: GetStoreUseCase

  it('should be possible retrieve all stores', async () => {
    const inMemoryRepository = new MechanicShopInMemoryRepository()
    sut = new GetStoreUseCase(inMemoryRepository)

    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
    inMemoryRepository.items = [
      { id: randomUUID(), name: 'Loja 1', adress: 'Endereço 1' },
      { id: randomUUID(), name: 'Loja 2', adress: 'Endereço 2' },
    ]

    const stores = await sut.findAllMechanics()

    expect(stores).toHaveLength(2)
    expect(stores).toEqual([
      { name: 'Loja 1', adress: 'Endereço 1' },
      { name: 'Loja 2', adress: 'Endereço 2' }
    ])
  })

  it('should return if doesnt exist mechanics', async () => {
    const inMemoryRepository = new MechanicShopInMemoryRepository()
    sut = new GetStoreUseCase(inMemoryRepository)

    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
    inMemoryRepository.items = []

   await expect(sut.findAllMechanics()).rejects.toEqual(null)
  })
})