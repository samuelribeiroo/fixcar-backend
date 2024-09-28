import { ResourceWasNotFoundedError } from "@/services/errors/resource-not-available-error"
import { describe, expect, it } from "vitest"
import { GetCustomerUseCase } from "./get-user"
import { CustomerInMemoryRepository } from "@/repositories/in-memory/customer-in-memory-repository"
import { hash } from "bcrypt"




describe('Use Case: Get Costumer', () => {
  let getUser: GetCustomerUseCase

  it('should be possible find the customer by ID', async () => {
    const inMemoryRepository = new CustomerInMemoryRepository()
    getUser = new GetCustomerUseCase(inMemoryRepository)

    const customer = await inMemoryRepository.create({
      name: 'John Doe',
      email: 'john@mail.com',
      password_hash: await hash('123456789', 6),
    })

    const costumer = await getUser.findUser({
      customerID: customer.id
    })

    expect(costumer.id).toEqual(expect.any(String))
    expect(costumer.name).toEqual(expect.any(String))
  })

   it('should not possible find a inexistent customer', async () => {
    const inMemoryRepository = new CustomerInMemoryRepository()
    getUser = new GetCustomerUseCase(inMemoryRepository)

    const customer = getUser.findUser({
      customerID: 'non-inexistent'
    })

    expect(customer).rejects.toBeInstanceOf(ResourceWasNotFoundedError)
   })

})