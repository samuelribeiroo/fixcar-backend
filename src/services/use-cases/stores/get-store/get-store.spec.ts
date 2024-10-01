import { randomUUID } from "node:crypto"
import { MechanicShopInMemoryRepository } from "@/repositories/in-memory/mechanic-shop-in-memory-repository"
import { ResourceWasNotFoundedError } from "@/services/errors/resource-not-available-error"
import { describe, expect, it, vitest, beforeEach } from "vitest"
import { GetStoreUseCase } from "./get-store"

describe('Use Case: Get Store', () => {
  beforeEach(() => vitest.clearAllMocks())

  let sut: GetStoreUseCase

  it('should be possible find the store by ID', async () => {
    const inMemoryRepository = new MechanicShopInMemoryRepository()
    sut = new GetStoreUseCase(inMemoryRepository)

    const store = await inMemoryRepository.create({
      id: randomUUID(),
      name: 'Auto Center Mechanic Shop',
      adress: 'R. Avenida Brigadeiro Faria Lima, Pinheiros. São Paulo-SP 05426-100',
    })

  
    expect(store.id).toEqual(expect.any(String))
  })

  it('should not possible find a inexistent customer', async () => {
    const inMemoryRepository = new MechanicShopInMemoryRepository()
    sut = new GetStoreUseCase(inMemoryRepository)

    const store = sut.findStore({
      storeID: 'inexistent-store'
    })

    expect(store).rejects.toBeInstanceOf(ResourceWasNotFoundedError)
  })
})

