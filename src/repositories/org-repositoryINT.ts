import { Org, Prisma } from "@prisma/client"

export interface OrgRepositoryInterface {

  create(data:Prisma.OrgCreateInput):Promise<Org>
  findByID(id:string):Promise<Org | null>
  findByEmail(email:string):Promise<Org | null>
}