import { PrismaOrgRepository } from "@/repositories/prisma/prisma-org-repository";
import { AuthenticateOrgUC } from "../authenticateOrgUC";


export function authenticateOrgFactory(){

    const orgRepository = new PrismaOrgRepository()

    const authenticateOrgCase = new AuthenticateOrgUC(orgRepository)

    return authenticateOrgCase
}