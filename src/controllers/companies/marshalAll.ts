import {CompanyNode} from "../../models/companies/types/CompanyNode"
import {marshal} from "./marshal"
import {CompanyResponse} from "./types/CompanyResponse"

export function marshalAll(companies: Array<CompanyNode>): Array<CompanyResponse> {
    const responseObjects: Array<CompanyResponse> = []

    companies.forEach((company: CompanyNode) => {
        responseObjects.push(marshal(company))
    })

    return responseObjects
}
