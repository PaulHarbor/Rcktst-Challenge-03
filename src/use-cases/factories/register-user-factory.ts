import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { RegisterUserUC } from "../userRegisterUC";


export function registerUserFactory(){

    const userRepository = new PrismaUserRepository()

    const registerUserCase = new RegisterUserUC(userRepository)

    return registerUserCase
}