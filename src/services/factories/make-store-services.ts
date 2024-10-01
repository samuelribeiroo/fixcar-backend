import { PrismaMechanicRepository } from "@/repositories/prisma/prisma-mechanic-repository"
import { GetStoreUseCase } from "../use-cases/stores/get-store/get-store"

export default function makeStoreUseCase() {
  const prismaCustomerRepository = new PrismaMechanicRepository()
  const getCustomer = new GetStoreUseCase(prismaCustomerRepository)

  return getCustomer
}