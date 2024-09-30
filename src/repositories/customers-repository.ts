import type { CustomerWithoutSensitiveData } from "@/types/interfaces"
import type { Customer, Prisma } from "@prisma/client"

export default interface CustomerRepository {
  findByID(id: string): Promise<CustomerWithoutSensitiveData | null>
  findByEmail(email: string): Promise<Customer | null>
  create(data: Prisma.CustomerCreateInput): Promise<Customer>
}