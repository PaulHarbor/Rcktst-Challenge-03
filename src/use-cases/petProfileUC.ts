import { PetRepositoryInterface } from "@/repositories/pet-repositoryINT"
import { Pet } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"


interface PetProfileCaseRequest {
  petId: string
}

interface PetProfileCaseResponse {
  pet: Pet
}

export class PetProfileUC {

  constructor (private petRepository: PetRepositoryInterface){}

  async execute({
    petId
  }:PetProfileCaseRequest):Promise<PetProfileCaseResponse> {

    //console.log('Looking for pet with id: ',petId)
    const pet = await this.petRepository.findByID(petId)

    if(!pet){
      throw new ResourceNotFoundError()
    }

    //console.log(`Pet ${pet.name} retrieved`)

    return {
      pet,      
    }
    
  }
}