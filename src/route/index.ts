import createAppointment from '@/controller/appointments/create-appointment-controller'
import authCostumer from '@/controller/customers/authenticate-customer-controller'
import search from '@/controller/customers/get-customer-controller'
import register from '@/controller/customers/register-controller'
import searchProfessional from '@/controller/professionals/get-professional-controller'
import registerProfessional from '@/controller/professionals/register-professional-controller'
import { getAllMechanicShops } from '@/controller/stores/get-all-store-controller'
import getStore from '@/controller/stores/get-store-controller'
import createStore from '@/controller/stores/register-store-controller'
import type { FastifyInstance } from 'fastify'

export default async function AppRoutes(app: FastifyInstance) {
  // Routes relationed to entity: Customers.
  app.post('/sign-up', register)
  app.get('/search-user/:id', search)
  app.post('/auth-costumer', authCostumer)

  // Routes relationed to entity: Store (MechanicShop)
  app.post('/create-store', createStore)
  app.get('/search-store/:name', getStore)
  app.get('/all-stores', getAllMechanicShops)

  // Routes relationed to entity: Professionals.
  app.post('/sign-up-professional', registerProfessional)
  app.get('/professionals/:id', searchProfessional)

  // Route relationed to entity: Appointment.
  app.post('/create-appointment', createAppointment)
}