import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { AuthenticateUC } from "../authenticateUC";


export function authenticateUserFactory(){

    const userRepository = new PrismaUserRepository()

    const authenticateCase = new AuthenticateUC(userRepository)

    return authenticateCase
}