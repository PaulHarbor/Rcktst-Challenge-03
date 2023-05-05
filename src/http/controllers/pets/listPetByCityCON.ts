import { listPetByCityFactory } from "@/use-cases/factories/list-pet-by-city-factory";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";


export async function listPetsByCity(req:FastifyRequest, rep:FastifyReply){

  const petListByCityQuerySchema = z.object({
    petCity: z.string(),
    page: z.coerce.number().min(1).default(1),
    name: z.string().optional(),
    species: z.enum(['DOG','CAT']).optional(),
    age: z.number().optional(),
    energy: z.number().min(1).optional(),
    build: z.enum(['SMALL','MEDIUM','LARGE']).optional(),
    independence: z.enum(['LOW','MEDIUM','HIGH']).optional(),
    description: z.string().optional()
  })

  const { petCity, page, ...filters } = petListByCityQuerySchema.parse(req.query)

  const listPetByCityUseCase = listPetByCityFactory()

  const { pets } = await listPetByCityUseCase.execute({
    petCity,
    page,
    ...filters
  })

  return rep.status(200).send({
    pets,
})
}