import { CustomerInMemoryRepository } from "@/repositories/in-memory/customer-in-memory-repository"
import { hash } from "bcrypt"
import { describe, expect, it, 
} from "vitest"
import { InvalidCredentialsError } from "../../../errors/credential-are-invalid-error"
import { AuthenticateUseCase } from "./authenticate-user"

let sut: AuthenticateUseCase

describe('Use Case: Authenticate', () => {
  it('should authenticate user if credentials are valid', async () => {
    const inMemoryRepository = new CustomerInMemoryRepository()
    sut = new AuthenticateUseCase(inMemoryRepository)

    const customerData = {
      name: 'John Doe',
      email: 'john@mail.com',
      password: '123456',
    }

    await inMemoryRepository.create({
      name: customerData.name,
      email: customerData.email,
      password_hash: await hash(customerData.password, 6)
    })

    const authObj = await sut.auth({
      email: customerData.email,
      password: customerData.password
    })

    const { customer: { name, email } } = authObj

    expect(email).toEqual(customerData.email)
    expect(name).toEqual(expect.any(String))
    expect(email).toEqual(expect.any(String))
  })

  it('should throw error if email does not found', async () => {
    const inMemoryRepository = new CustomerInMemoryRepository()
    sut = new AuthenticateUseCase(inMemoryRepository)

    await expect(sut.auth({
      email: 'notfound@mail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should throw error if password is wrong', async () => {
    const inMemoryRepository = new CustomerInMemoryRepository()
    sut = new AuthenticateUseCase(inMemoryRepository)

    const password = '123456'
    const hashedPassword = await hash(password, 6)

    await inMemoryRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password_hash: hashedPassword
    })

    await expect(sut.auth({
      email: 'incorret-email.com',
      password: hashedPassword
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should throw error if password is wrong', async () => {
    const inMemoryRepository = new CustomerInMemoryRepository()
    sut = new AuthenticateUseCase(inMemoryRepository)

    await inMemoryRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password_hash: await hash('123456', 6),
    })

    await expect(sut.auth({
      email: 'johndoe@mail.com',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})

