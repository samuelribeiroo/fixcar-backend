import { z } from "zod"

export const registerCustomerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6)
})