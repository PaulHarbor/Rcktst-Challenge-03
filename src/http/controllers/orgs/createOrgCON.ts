import { createOrgFactory } from "@/use-cases/factories/create-org-factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function createOrg(req: FastifyRequest, rep: FastifyReply) {

  const createOrgBodySchema = z.object({
    title:z.string(),
    email:z.string().email(),
    password:z.string().min(6),
    address:z.string(),
    phone:z.string()
  })

  const { title, email, password, address, phone } = createOrgBodySchema.parse(req.body)

  const createOrgCase = createOrgFactory()

  await createOrgCase.execute({
    title,
    email,
    password,
    address,
    phone
  })

  return rep.code(201).send()

}