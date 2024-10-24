import { PrismaMechanicRepository } from "@/repositories/prisma/prisma-mechanic-repository"
import { StoreRegisterUseCase } from "../use-cases/stores/create/register-store"

export default function makeRegisterStoreUseCase() {
  const prismaCustomerRepository = new PrismaMechanicRepository()
  const store = new StoreRegisterUseCase(prismaCustomerRepository)

  return store
}