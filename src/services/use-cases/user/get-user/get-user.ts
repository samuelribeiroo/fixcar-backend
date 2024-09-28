import type CustomerRepository from "@/repositories/customers-repository"
import { ResourceWasNotFoundedError } from "@/services/errors/resource-not-available-error"
import type { GetCustomerRequest } from "@/types/interfaces"

export class GetCustomerUseCase {
  constructor(private getCustomer: CustomerRepository) { }

  async findUser ({ customerID }: GetCustomerRequest) {
    const handleGetProfile = await this.getCustomer.findByID(customerID)

    if (!handleGetProfile) throw new ResourceWasNotFoundedError()

    return handleGetProfile
    
  }
}