import { UserRepositoryInterface } from "@/repositories/user-repositoryINT"
import { User } from "@prisma/client"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"

interface RegisterUserCaseRequest {
    name: string,
    email: string,
    password: string
}

interface RegisterUserCaseResponse {
    user: User
}

export class RegisterUserUC {

    constructor(private userRepository: UserRepositoryInterface) { }

    async execute({
        name,
        email,
        password
    }: RegisterUserCaseRequest): Promise<RegisterUserCaseResponse> {

        const password_hash = await hash(password, 6)

        const userWithSameEmail = await this.userRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError()
        }

        const user = await this.userRepository.create({
            name,
            email,
            password_hash
        })

        return {
            user,
        }
    }
}