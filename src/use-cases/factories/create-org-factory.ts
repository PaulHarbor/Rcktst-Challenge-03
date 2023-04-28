import { PrismaOrgRepository } from "@/repositories/prisma/prisma-org-repository";
import { CreateOrgUC } from "../createOrgUC";

export function createOrgFactory(){

    const orgRepository = new PrismaOrgRepository()

    const createOrgCase = new CreateOrgUC(orgRepository)

    return createOrgCase
}