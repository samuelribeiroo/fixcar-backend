import type { Customer } from "@prisma/client"

export interface CustomerRegisterRequest {
  id?: string
  name: string
  email: string
  password: string
}

export interface CustomerRegisterResponse {
  id?: string
  name: string
  email: string
  password_hash: string
  created_at?: Date | string
}

export interface GetCustomerRequest {
  customerID: string
}

export interface GetCustomerResponse {
  customer: Customer
}


export type CustomerWithoutSensitiveData = Omit<Customer, 'password_hash' | 'created_at'>