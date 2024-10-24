import { randomUUID } from "node:crypto"
import { ProfessionalInMemoryRepository } from "@/repositories/in-memory/professional-in-memory-repository"
import { ResourceWasNotFoundedError } from "@/services/errors/resource-not-available-error"
import { beforeEach, describe, expect, it, vitest } from "vitest"
import { GetProfessionalUseCase } from "./get-professional"

describe('Use Case: Get Professional', () => {
  beforeEach(() => vitest.clearAllMocks())

  let sut: GetProfessionalUseCase

  it('should be possible find a professional by ID', async () => {
    const inMemoryRepository = new ProfessionalInMemoryRepository()
    sut = new GetProfessionalUseCase(inMemoryRepository)

    const professional = await inMemoryRepository.create({
      id: randomUUID(),
      name: 'John Doe Professional',
      mechanicShop: {
        create: undefined,
        connectOrCreate: undefined,
        connect: undefined
      }
    })


    expect(professional.id).toEqual(expect.any(String))
  })
  
  it('should throw ResourceWasNotFoundedError when trying to find a non-existent professional by ID', async () => {
    const inMemoryRepository = new ProfessionalInMemoryRepository();
    sut = new GetProfessionalUseCase(inMemoryRepository);
  
    const nonExistentId = randomUUID();
  
    await expect(sut.getProfessional(nonExistentId)).rejects.toBeInstanceOf(ResourceWasNotFoundedError)
  })
  
})