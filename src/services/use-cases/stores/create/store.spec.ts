import { randomUUID } from "node:crypto"
import { beforeEach, describe, expect, it, vitest } from "vitest"
import { StoreRegisterUseCase } from "./register-store"

describe('Use Case: Register Store', () => {
  beforeEach(() => vitest.clearAllMocks())

  it('should be able register a mechanic store', async () => {
    const sut = new StoreRegisterUseCase({
      async create({ id, name, adress }) {
        return {
          id,
          name,
          adress
        }
      },
      
      async findByID(id) {
        return null
      },

      async findAll() {
        return null
      },
    })

    const data = await sut.create({
      id: randomUUID(),
      name: 'Auto Center Unidade 1',
      adress: '8315 York Rd. Brooklyn, NY 11223'
    })

    expect(data).toHaveProperty('adress', '8315 York Rd. Brooklyn, NY 11223')
    expect(data.id).toEqual(expect.any(String))
    expect(data.name).toEqual(expect.any(String))
    expect(data.adress).toEqual(expect.any(String))
  })
})