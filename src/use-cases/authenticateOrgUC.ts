import { Org } from "@prisma/client";
import { InvalidUserCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { OrgRepositoryInterface } from "@/repositories/org-repositoryINT";


interface AuthenticateUseCaseRequest {
    email:string,
    password: string,
}

interface AuthenticateUseCaseResponse {
    org: Org
}

export class AuthenticateOrgUC {

    constructor(private orgRepository:OrgRepositoryInterface) {}

    async execute({
        email,
        password
    }:AuthenticateUseCaseRequest):Promise<AuthenticateUseCaseResponse>{

        const org = await this.orgRepository.findByEmail(email)

        if(!org){
            throw new InvalidUserCredentialsError()
        }

        const doesPasswordMatch = await compare(password, org.password_hash)

        if(!doesPasswordMatch){
            throw new InvalidUserCredentialsError()
        }

        return {
            org,
        }
    }
}

