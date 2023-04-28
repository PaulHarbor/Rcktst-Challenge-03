import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error"
import { registerUserFactory } from "@/use-cases/factories/register-user-factory"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

export async function registerUser(req: FastifyRequest, rep: FastifyReply) {

    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { name, email, password } = registerBodySchema.parse(req.body)

    try {

        const registerUserCase = registerUserFactory()

        await registerUserCase.execute({
            name,
            email,
            password
        })

    } catch (err) {

        if(err instanceof UserAlreadyExistsError) {
            return rep.status(409).send({message:err.message})
        }

        throw err
    }

    return rep.status(201).send()
}