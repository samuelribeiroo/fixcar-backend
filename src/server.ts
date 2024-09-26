import { fastify } from "fastify"

const app = fastify()

app.get("/", (request, reply) => {
  return reply.send({ message: "Servidor subiu." })
});

app
  .listen({
    host: "0.0.0.0",
    port: 8080,
  })
  .then(() => console.log("Servidor Inicializado 🔥: http://localhost:8080"))
