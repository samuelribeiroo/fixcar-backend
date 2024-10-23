import { PrismaProfessionalRepository } from "@/repositories/prisma/prisma-professional-repository"
import { RegisterProfessionalUseCase } from "../use-cases/professional/create/register-professional"

// makeProfessionalFactory
export default function makeProfessionalFactory() {
  const prismaProfessionalRepository = new PrismaProfessionalRepository()
  const register = new RegisterProfessionalUseCase(prismaProfessionalRepository)

  return register
}