import { PetRepositoryInterface } from "@/repositories/pet-repositoryINT"
import { Build, Independence, Pet, Species } from "@prisma/client"


interface PetListByCityCaseRequest {
  petCity: string
  page: number
  name?: string
  species?: Species
  age?: number
  energy?: number
  build?: Build
  independence?: Independence
  description?: string
}

interface PetListByCityCaseResponse {
  pets: Pet[]
}

export class PetListByCityUseCase {

  constructor(private petRepository: PetRepositoryInterface) { }

  async execute({
    petCity,
    page,
    name,
    species,
    age,
    energy,
    build,
    independence,
    description
  }: PetListByCityCaseRequest): Promise<PetListByCityCaseResponse> {

    const pets = await this.petRepository.findManyByCity(
      petCity,
      page ?? 1,
      {
        name,
        species,
        age,
        energy,
        build,
        independence,
        description
      }
    )

    return {
      pets,
    }
  }
}