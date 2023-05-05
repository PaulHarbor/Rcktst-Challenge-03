import { PrismaOrgRepository } from "@/repositories/prisma/prisma-org-repository";
import { OrgProfileUC } from "../orgProfileUC";


export function orgProfileFactory(){

  const orgRepository = new PrismaOrgRepository()

  const orgProfileUseCase = new OrgProfileUC(orgRepository)

  return orgProfileUseCase
}
