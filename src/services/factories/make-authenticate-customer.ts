import { PrismaCustomerRepository } from "@/repositories/prisma/prisma-customer-repository"
import { AuthenticateUseCase } from "../use-cases/user/authenticate/authenticate-user"

export default function makeAuthenticateUseCase() {
  const customerRepository = new PrismaCustomerRepository()
  const authenticateUseCase = new AuthenticateUseCase(customerRepository)

  return authenticateUseCase
}