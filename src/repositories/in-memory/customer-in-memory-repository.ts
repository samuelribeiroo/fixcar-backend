import { randomUUID } from "node:crypto";
import type { CustomerWithoutSensitiveData } from "@/types/interfaces";
import type { Customer, Prisma } from "@prisma/client";
// biome-ignore lint/style/useImportType: <explanation>
import CustomerRepository from "../customers-repository";
import { ResourceWasNotFoundedError } from "@/services/errors/resource-not-available-error";

export class CustomerInMemoryRepository implements CustomerRepository {
  public items: Customer[] = []

  findByID(id: string): Promise<CustomerWithoutSensitiveData | null> {
    const customer = this.items.find(item => item.id === id)

    if (!customer) {
      throw new ResourceWasNotFoundedError()
    }

    const { name, id: customerID, email } = customer

    return Promise.resolve({
      name,
      id: customerID,
      email
    })
  }


  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async findByEmail(email: string): Promise<any> {
    const customer = this.items.find(item => item.email === email)

    if (!customer) {
      return null
    }

    return {
      customer
    }
  }

  async create(data: Prisma.CustomerCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date()
    }

    this.items.push(user)

    return user
  }
}

export { CustomerRepository }
