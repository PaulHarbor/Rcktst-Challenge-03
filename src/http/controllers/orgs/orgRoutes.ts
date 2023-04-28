import { FastifyInstance } from "fastify";
import { createOrg } from "./createOrgCON";
import { authenticateOrg } from "./authenticateOrgCON";
import { refreshOrgToken } from "./refreshOrgTokenCON";
import { verifyJWT } from "../middlewares/verify-jwt";
import { verifyUserRole } from "../middlewares/verify-user-role";


export async function orgRoutes(app:FastifyInstance){

  app.addHook('onRequest', verifyJWT)

  app.post('/orgs',{onRequest:[verifyUserRole('ADMIN')]},createOrg)
  app.post('/orgs/sessions', authenticateOrg)
  app.patch('/orgs/token/refresh', refreshOrgToken)
}