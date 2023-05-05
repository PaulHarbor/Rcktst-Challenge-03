import { petProfileFactory } from "@/use-cases/factories/pet-profile-factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function petProfile(req:FastifyRequest, rep:FastifyReply){

  //console.log('Pet Profile route called')
  const petProfileBodySchema = z.object({
    petId: z.string()
  })

  const { petId } = petProfileBodySchema.parse(req.query)
  //console.log(`Pet ID ${petId} retrieved from query`)

  const petProfile = petProfileFactory()

  const { pet } = await petProfile.execute({petId:petId})

  return rep.status(200).send({
    pet:{
      ...pet
    }
  })
}