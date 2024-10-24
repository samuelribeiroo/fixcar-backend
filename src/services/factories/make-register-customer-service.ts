import { PrismaCustomerRepository } from "@/repositories/prisma/prisma-customer-repository"
import { CustomerRegisterUseCase } from "../use-cases/user/register/register-customer"

export default function makeRegisterCustomerUseCase() {
  const prismaCustomerRepository = new PrismaCustomerRepository()
  const newCustomer = new CustomerRegisterUseCase(prismaCustomerRepository)

  return newCustomer
}