import { PrismaPetRepository } from "@/repositories/prisma/prisma-pet-repository"
import { RegisterPetUC } from "../petRegisterUC"
import { PrismaOrgRepository } from "@/repositories/prisma/prisma-org-repository"

export function registerPetFactory(){

    const petRepository = new PrismaPetRepository()
    const orgRepository = new PrismaOrgRepository()

    const registerUserCase = new RegisterPetUC(petRepository, orgRepository)

    return registerUserCase
}