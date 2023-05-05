import { PrismaPetRepository } from "@/repositories/prisma/prisma-pet-repository";
import { PetProfileUC } from "../petProfileUC";


export function petProfileFactory(){

  const petRepository = new PrismaPetRepository()

  const petProfileUseCase = new PetProfileUC(petRepository)

  return petProfileUseCase
}