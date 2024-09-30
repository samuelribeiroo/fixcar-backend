import type CustomerRepository from "@/repositories/customers-repository"
import { EmailAlreadyUse } from "@/services/errors/email-in-use-error"
import type { CustomerRegisterRequest, CustomerRegisterResponse } from '@/types/interfaces'
import { hash } from "bcrypt"

export class CustomerRegisterUseCase {
  constructor(private customerRepository: CustomerRepository) { }

  async create({
    name,
    email,
    password,
  }: CustomerRegisterRequest): Promise<CustomerRegisterResponse> {
    const password_hash = await hash(password, 6)
    const customerWithSameEmail = await this.customerRepository.findByEmail(email)

    // Personalized error if email already in use -> src\services\errors\email-in-use-error.ts
    if (customerWithSameEmail) throw new EmailAlreadyUse()

    const createCustomer = await this.customerRepository.create({
      name,
      email,
      password_hash,
    })

    const newCustomerData = {
      id: createCustomer.id,
      name: createCustomer.name,
      email: createCustomer.email,
      password_hash: createCustomer.password_hash,
      created_at: createCustomer.created_at,
    }

    // Ensure that the return matches the CustomerRegisterResponse interface provided.
    return newCustomerData
  }
}
