import { Prisma, Org } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { OrgRepositoryInterface } from "../org-repositoryINT";


export class PrismaOrgRepository implements OrgRepositoryInterface {
    
  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = await prisma.org.create({
      data
    })

    return org
  }
  
  async findByID(id: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where:{
        id
      }
    })

    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    
    const org = await prisma.org.findUnique({
      where:{
        email,
      }
    })

    return org
  }
}
