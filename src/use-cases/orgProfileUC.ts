import { OrgRepositoryInterface } from "@/repositories/org-repositoryINT"
import { Org } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"


interface OrgProfileCaseRequest {
  orgId: string
}

interface OrgProfileCaseResponse {
  org: Org
}

export class OrgProfileUC {

  constructor(private orgRepository: OrgRepositoryInterface) { }

  async execute({
    orgId
  }: OrgProfileCaseRequest): Promise<OrgProfileCaseResponse> {

    const org = await this.orgRepository.findByID(orgId)

    if(!org){
      throw new ResourceNotFoundError()
    }
    
    return{
      org,
    }
  }
}

