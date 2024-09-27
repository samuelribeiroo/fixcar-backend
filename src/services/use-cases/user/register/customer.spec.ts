import { randomUUID } from "node:crypto"
import { beforeEach } from "node:test"
import { CustomerInMemoryRepository } from "@/repositories/in-memory/customer-in-memory-repository";
import { EmailAlreadyUse } from "@/services/errors/email-in-use-error";
import { hash } from "bcrypt"
import { describe, expect, it, vitest, } from "vitest"
import { CustomerRegisterUseCase } from "../register/register-customer"


describe('Use Case: Register', () => {
  beforeEach(() => vitest.clearAllMocks())

  it('should be able register customer/user', async () => {
    const sut = new CustomerRegisterUseCase({
      async findByEmail(email) {
        return null
      },

      async create(data) {
        return {
          id: data.id ? 'user-1' : randomUUID(),
          name: data.name,
          email: data.email,
          created_at: new Date(),
          password_hash: data.password_hash
        }
      },
    })

    const { name, id, email, password_hash } = await sut.create({
      id: randomUUID(),
      name: 'John Doe',
      email: 'john@mail.com',
      password: await hash('1234567', 6)
    })

    expect(name).toEqual(expect.any(String))
    expect(id).toEqual(expect.any(String))
  })

  it('should not be possible register a user with the same email', async () => {
    const memoryRepository = new CustomerInMemoryRepository()
    const sut = new CustomerRegisterUseCase(memoryRepository)

    const email = 'johndoe@mail.com'

    await sut.create({
      name: 'John Doe',
      email,
      password: '123456789',
    })

    await expect(sut.create({
      name: 'John Doe',
      email,
      password: '123456789',
    })).rejects.toBeInstanceOf(EmailAlreadyUse)
  })
})
