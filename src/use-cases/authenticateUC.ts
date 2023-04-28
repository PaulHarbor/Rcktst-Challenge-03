import { UserRepositoryInterface } from "@/repositories/user-repositoryINT";
import { User } from "@prisma/client";
import { InvalidUserCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";


interface AuthenticateUseCaseRequest {
    email:string,
    password: string,
}

interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUC {

    constructor(private userRepository:UserRepositoryInterface) {}

    async execute({
        email,
        password
    }:AuthenticateUseCaseRequest):Promise<AuthenticateUseCaseResponse>{

        const user = await this.userRepository.findByEmail(email)

        if(!user){
            throw new InvalidUserCredentialsError()
        }

        const doesPasswordMatch = await compare(password, user.password_hash)

        if(!doesPasswordMatch){
            throw new InvalidUserCredentialsError()
        }

        return {
            user,
        }
    }
}

