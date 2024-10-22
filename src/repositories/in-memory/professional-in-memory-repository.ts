import type { ProfessionalInterface } from "@/types/interfaces"
import type { Prisma } from "@prisma/client"
import type { ProfessionalRepository } from "../professional-repository"

export class ProfessionalInMemoryRepository implements ProfessionalRepository {
  private items: ProfessionalInterface[] = [];

  async create(data: Prisma.ProfessionalCreateInput): Promise<ProfessionalInterface> {
    const professional = {
      name: data.name,
      id: data.id || "some-generated-id",
      mechanicShopId: data.mechanicShop.connect?.id as string,
    }

    this.items.push(professional);

    return Promise.resolve(professional)
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async findByName(name: string): Promise<any> {
    return this.items.find(item => item.name === name) || null
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async findByID(id: string): Promise<any> {
    return this.items.find(item => item.id === id) || null
  }
}
