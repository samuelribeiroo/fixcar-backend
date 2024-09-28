import { prisma } from "@/lib/prisma"
import type { Customer, Prisma } from "@prisma/client"
import type CustomerRepository from "../customers-repository"
import type { CustomerWithoutSensitiveData } from "@/types/interfaces"
import { ResourceWasNotFoundedError } from "@/services/errors/resource-not-available-error"

export class PrismaCustomerRepository implements CustomerRepository {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async findByID(id: string): Promise<CustomerWithoutSensitiveData | null> {
    const customer = await prisma.customer.findUnique({
      where: {
        id
      }
    })

    if (!customer) {
      throw new ResourceWasNotFoundedError()
    }


    // Remove manually sensitive data 
    const { password_hash, created_at, ...customerWithoutSensitiveData } = customer

    return customerWithoutSensitiveData
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = await prisma.customer.findUnique({
      where: {
        email
      }
    })

    return customer
  }

  async create(data: Prisma.CustomerCreateInput): Promise<Customer> {
    return await prisma.customer.create({
      data
    })
  }
}