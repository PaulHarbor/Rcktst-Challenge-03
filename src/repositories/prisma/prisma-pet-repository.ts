import { Pet, Prisma, Species, Build, Independence } from '@prisma/client';
import { prisma } from "@/lib/prisma";
import { PetRepositoryInterface } from "../pet-repositoryINT";


export class PrismaPetRepository implements PetRepositoryInterface {

  async create(data: Prisma.PetCreateInput) {
    const pet = prisma.pet.create({
      data
    })

    return pet
  }

  async findByID(id: string) {

    const pet = await prisma.pet.findUnique({
      where: {
        id
      }
    })

    return pet
  }

  async findManyByCity(
    petCity: string,
    page: number,
    filters?: {
      name?: string
      species?: Species
      age?: number
      energy?: number
      build?: Build
      independence?: Independence
      description?: string
    }

  ): Promise<Pet[]> {

    const pets = await prisma.pet.findMany({
      where: {
        city: petCity,
        ...filters
      },
      take: 20,
      skip: (page - 1) * 20
    })

    return pets
  }

}