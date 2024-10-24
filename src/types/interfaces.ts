import type { Customer, MechanicShop } from "@prisma/client"

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

export interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

export interface AuthenticateUseCaseResponse {
  customer: Customer
}

export interface AuthRequestBody {
  email: string;
  password: string;
}

export interface MechanicShopInterface {
  name: string
  id: string
  adress: string
}

export interface GetStoreRequest {
  storeID: string
}

export type StoreWithoutID = Omit<MechanicShop, 'id'>

export interface ProfessionalCreateRequest {
  id: string
  name: string,
  shopID: string
}

export interface ProfessionalInterface {
  name: string;
  id: string;
  mechanicShopId: string
}

export type AppointmentsTypes = {
  customerId: string | undefined
  id: string;
  customer: string;
  professionalId: string;
  storeId: string;
  appointmentTime: Date;
  created_at: Date;
  expiresAt: Date;
  service: string;
}

export interface AppointmentResponse {
  id: string;
  appointmentTime: Date;
  expiresAt: Date;
  service: string;
  customerId: string;
  professionalName: string;
  storeName: string;

}


export interface ErrorResponse {
  status: number;
}
