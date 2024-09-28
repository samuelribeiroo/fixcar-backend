import search from '@/controller/get-customer-controller'
import register from '@/controller/register-controller'
import type { FastifyInstance } from 'fastify'

export default async function AppRoutes(app: FastifyInstance) {
  app.post('/sign-up', register)
  app.get('/search-user/:id', search) // Volta o objeto inteiro, incluindo o hash da senha e email Corrigir isso.
}