import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middlewares/verify-jwt";
import { registerPet } from "./registerPetCON";
import { listPetsByCity } from "./listPetByCityCON";
import { petProfile } from "./petProfileCON";


export async function petRoutes(app:FastifyInstance){

  app.addHook('onRequest', verifyJWT)

  app.post('/pets',registerPet)

  app.get('/pets/list',listPetsByCity)

  app.get('/pets/profile/', petProfile)
  
}

//{onRequest:[verifyUserRole('ADMIN')]}