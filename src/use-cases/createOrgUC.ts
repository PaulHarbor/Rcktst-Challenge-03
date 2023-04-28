import { OrgRepositoryInterface } from "@/repositories/org-repositoryINT"
import { Org } from "@prisma/client"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"

interface CreateOrgCaseRequest {
  title:string,
  email:string,
  password:string,
  address:string,
  phone:string
}

interface CreateOrgCaseResponse {
  org: Org
}

export class CreateOrgUC {

  constructor(private orgRepository:OrgRepositoryInterface){}

  async execute({
    title,
    email,
    password,
    address,
    phone
  }:CreateOrgCaseRequest):Promise<CreateOrgCaseResponse> {

    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new UserAlreadyExistsError()
  }

    const org = await this.orgRepository.create({
      title,
      email,
      password_hash,
      address,
      phone
    })

    return {
      org,
    }
  }
}