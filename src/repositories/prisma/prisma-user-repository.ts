import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { UserRepositoryInterface } from "../user-repositoryINT";


export class PrismaUserRepository implements UserRepositoryInterface{

    async create(data:Prisma.UserCreateInput){
        const user = prisma.user.create({
            data
        })

        return user
    }

    async findByID(id:string){

        const user = await prisma.user.findUnique({
            where:{
                id
            }            
        })

        return user
    }

    async findByEmail(email:string){

        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })

        return user
    }
}