import { registerPetFactory } from "@/use-cases/factories/register-pet-factory"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

export async function registerPet(req: FastifyRequest, rep: FastifyReply) {

  const registerBodySchema = z.object({
    petName: z.string(),
    petSpecies: z.enum(['DOG','CAT']),
    petCity: z.string(),
    petAge: z.number(),
    petEnergy: z.number().min(1),
    petBuild: z.enum(['SMALL','MEDIUM','LARGE']),
    petIndependence: z.enum(['LOW','MEDIUM','HIGH']),
    petDescription: z.string().nullable(),
    petOrgId: z.string()

  })

  const {
    petName,
    petSpecies,
    petCity,
    petAge,
    petEnergy,
    petBuild,
    petIndependence,
    petDescription,
    petOrgId
  } = registerBodySchema.parse(req.body)

  try {

    const registerPetCase = registerPetFactory()

    await registerPetCase.execute({
      petName,
      petSpecies,
      petCity,
      petAge,
      petEnergy,
      petBuild,
      petIndependence,
      petDescription,
      petOrgId
    })

  } catch (err) {
    
    throw err
  }

  return rep.status(201).send()
}