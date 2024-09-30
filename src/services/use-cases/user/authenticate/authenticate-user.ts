import type { CustomerRepository } from "@/repositories/in-memory/customer-in-memory-repository";
import { InvalidCredentialsError } from "@/services/errors/credential-are-invalid-error";
import type { AuthenticateUseCaseRequest, AuthenticateUseCaseResponse } from "@/types/interfaces";
import { compare } from "bcrypt"

export class AuthenticateUseCase {
  constructor(private customerRepository: CustomerRepository) { }

  async auth({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const customer = await this.customerRepository.findByEmail(email)

    if (!customer) {
      throw new InvalidCredentialsError()
    } 

    const doesRightPassword = await compare(String(password), String(customer.password_hash))

    if (!doesRightPassword) {
      throw new InvalidCredentialsError()
    }
    
    return {
      customer
    }
  }
}