import { z } from "zod"

export const registerCustomerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6)
})

export const registerMechanicSchema = z.object({
  name: z.string(),
  id: z.string(),
  adress: z.string()
})
