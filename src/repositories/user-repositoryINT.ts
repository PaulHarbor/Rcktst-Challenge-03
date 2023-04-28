import {Prisma, User} from "@prisma/client"

export interface UserRepositoryInterface {

    create(data:Prisma.UserCreateInput): Promise<User>

    findByID(id:string):Promise<User | null>

    findByEmail(email:string): Promise<User | null>

}