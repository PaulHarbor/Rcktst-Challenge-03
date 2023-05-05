import { Prisma, Pet, Species, Build, Independence } from "@prisma/client"

export interface PetRepositoryInterface {

  create(data: Prisma.PetCreateInput): Promise<Pet>

  findByID(id: string): Promise<Pet | null>

  findManyByCity(
    city: string,
    page: number,
    filters: {
      name?: string,
      species?: Species,
      age?: number,
      energy?: number,
      build?: Build,
      independence?: Independence,
      description?: string
    }
  ): Promise<Pet[]>

}