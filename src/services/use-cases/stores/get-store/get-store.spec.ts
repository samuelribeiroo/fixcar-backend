import { randomUUID } from "node:crypto"
import { MechanicShopInMemoryRepository } from "@/repositories/in-memory/mechanic-shop-in-memory-repository"
import { ResourceWasNotFoundedError } from "@/services/errors/resource-not-available-error"
import { beforeEach, describe, expect, it, vitest } from "vitest"
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


    expect(store.name).toEqual(expect.any(String))
  })

  it('should do not possible find a inexistent ID', async () => {
    const inMemoryRepository = new MechanicShopInMemoryRepository()
    sut = new GetStoreUseCase(inMemoryRepository)

    const nonExistentStoreName = 'non-existent-store'

    const isInexistentStore = sut.findStore(nonExistentStoreName)

    await expect(isInexistentStore).rejects.toBeInstanceOf(ResourceWasNotFoundedError)
  })
})

