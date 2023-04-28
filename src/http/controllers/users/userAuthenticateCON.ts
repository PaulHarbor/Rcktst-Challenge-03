import { InvalidUserCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { authenticateUserFactory } from "@/use-cases/factories/authenticate-user-factory";
import { FastifyReply, FastifyRequest } from "fastify";

import { z } from "zod";


export async function authenticateUser(req: FastifyRequest, rep: FastifyReply) {

  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, password } = authenticateBodySchema.parse(req.body)

  try {

    const authenticateUseCase = authenticateUserFactory()

    const { user } = await authenticateUseCase.execute({
      email,
      password
    })

    const token = await rep.jwtSign(
      {
        role: user.role
      },
      {
        sign: {
          sub: user.id
        }
      })

    const refreshToken = await rep.jwtSign(
      {
        role: user.role
      },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d'
        }
      })

    return rep
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true
      })
      .status(200)
      .send({ token })

  } catch (err) {

    if (err instanceof InvalidUserCredentialsError) {
      return rep.status(400).send({ message: err.message })
    }

    throw err
  }
}