import { fastify } from "fastify"
import AppRoutes from "./route"

export const app = fastify()

app.register(AppRoutes)
