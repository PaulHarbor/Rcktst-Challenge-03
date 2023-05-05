import { PrismaPetRepository } from "@/repositories/prisma/prisma-pet-repository";
import { PetListByCityUseCase } from "../petListByCityUC";


export function listPetByCityFactory(){

  const petRepository = new PrismaPetRepository()

  const listPetByCityUseCase = new PetListByCityUseCase(petRepository)

  return listPetByCityUseCase
  
}