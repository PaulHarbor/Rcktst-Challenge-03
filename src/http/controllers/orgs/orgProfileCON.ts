import { orgProfileFactory } from "@/use-cases/factories/org-profile-factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function orgProfile(req: FastifyRequest, rep: FastifyReply) {


  const orgProfileBodySchema = z.object({
    orgId: z.string()
  })

  const {orgId} = orgProfileBodySchema.parse(req.query)

  const orgProfile = orgProfileFactory()

  const {org} = await orgProfile.execute({orgId: orgId})

  return rep.status(200).send({
    org
  })
}