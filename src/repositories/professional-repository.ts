import type { Prisma, Professional } from "@prisma/client"

export interface ProfessionalRepository {
  create(data: Prisma.ProfessionalCreateInput): Promise<Professional>
  findByName(name: string): Promise<Professional | null>
  findByID(id: string):  Promise<Professional | null> 
}