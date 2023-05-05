import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { env } from "./env";
import fastifyCookie from "@fastify/cookie";
import { userRoutes } from "./http/controllers/users/userRoutes";
import { orgRoutes } from "./http/controllers/orgs/orgRoutes";
import { petRoutes } from "./http/controllers/pets/petRoutes";

export const app = fastify()

app.register(fastifyJwt,{
  secret:env.JWT_SECRET,
  cookie:{
      cookieName:'refreshToken',
      signed:false
  },
  sign:{
      expiresIn:'10m'
  },  
})

app.register(fastifyCookie)
app.register(userRoutes)
app.register(orgRoutes)
app.register(petRoutes)
