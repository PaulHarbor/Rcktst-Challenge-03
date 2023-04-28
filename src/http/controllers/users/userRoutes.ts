import { FastifyInstance } from "fastify";
import { registerUser } from "./userRegisterCON";
import { authenticateUser } from "./userAuthenticateCON";
import { refreshUserToken } from "./refreshUserTokenCON";


export async function userRoutes(app:FastifyInstance) {

    app.post('/users',registerUser)
    app.post('/sessions', authenticateUser)
    app.patch('/token/refresh', refreshUserToken)
}