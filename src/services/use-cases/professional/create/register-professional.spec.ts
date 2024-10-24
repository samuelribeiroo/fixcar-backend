import { ProfessionalInMemoryRepository } from "@/repositories/in-memory/professional-in-memory-repository"
import { ProfessionalRegisteredError } from "@/services/errors/professional-already-registered-error"
import { beforeEach, describe, expect, it, vitest, } from "vitest"
import { RegisterProfessionalUseCase } from "./register-professional"

describe('Use Case: Register a new Professional', () => {
  beforeEach(() => vitest.clearAllMocks())

  it('should be possible create a new professional', async () => {
    const InMemoryRepository = new ProfessionalInMemoryRepository()
    const sut = new RegisterProfessionalUseCase(InMemoryRepository)
  
    const { name } = await sut.create({
      name: 'John Doe Professional',
      id: '1',
      shopID: '1'
    })

    expect(name).toEqual(expect.any(String))
  })

  it('should not allowed registering a new professional with the same name', async () => {
    const InMemoryRepository = new ProfessionalInMemoryRepository()
    const sut = new RegisterProfessionalUseCase(InMemoryRepository)

    const name = 'John Doe Professional'

    await sut.create({
      name,
      id: '1',
      shopID: '1'
    })

    await expect(sut.create({
      name,
      id: '2',
      shopID: '1'
    })).rejects.toBeInstanceOf(ProfessionalRegisteredError)
  })
})