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
