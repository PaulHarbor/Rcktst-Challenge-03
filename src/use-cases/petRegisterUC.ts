import { Build, Independence, Pet, Species } from "@prisma/client"
import { PetRepositoryInterface } from "@/repositories/pet-repositoryINT"
import { OrgRepositoryInterface } from "@/repositories/org-repositoryINT"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface RegisterPetCaseRequest {
  petName: string,
  petSpecies: Species,
  petCity: string,
  petAge: number,
  petEnergy: number,
  petBuild: Build,
  petIndependence: Independence,
  petDescription?: string | null,
  petOrgId: string,
}

interface RegisterPetCaseResponse {
  pet: Pet
}

export class RegisterPetUC {

  constructor(
    private petRepository: PetRepositoryInterface,
    private orgRepository: OrgRepositoryInterface) { }

  async execute({
    petName,
    petSpecies,
    petCity,
    petAge,
    petEnergy,
    petBuild,
    petIndependence,
    petDescription,
    petOrgId
  }: RegisterPetCaseRequest): Promise<RegisterPetCaseResponse> {

    const org = this.orgRepository.findByID(petOrgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petRepository.create({
      name: petName,
      species: petSpecies,
      city: petCity,
      age: petAge,
      energy: petEnergy,
      build: petBuild,
      independence: petIndependence,
      description: petDescription,
      org: { connect: { id: petOrgId } }
    })

    return {
      pet,
    }

  }
}