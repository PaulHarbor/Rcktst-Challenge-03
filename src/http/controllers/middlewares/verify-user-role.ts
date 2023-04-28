import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyJWT } from "@/@types/fastify-jwt";

export function verifyUserRole(roleToVerify: 'ADMIN' | 'MEMBER') {
  return async (req: FastifyRequest & { user: FastifyJWT['user'] }, rep: FastifyReply) => {

    const { role } = req.user

    if (role != roleToVerify) {
      return rep.status(401)
        .send({ message: '⛔ User Role Unauthorized...' })
    }
  }
}
