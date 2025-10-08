import {CompanyNode} from "../../../models/companies/types/CompanyNode"
import {marshalNode} from "./marshalNode"
import {CompanyResponse} from "../types/CompanyResponse"

export function marshalNodeCollection(companies: Array<CompanyNode>): Array<CompanyResponse> {
    const responseObjects: Array<CompanyResponse> = []

    companies.forEach((company: CompanyNode) => {
        responseObjects.push(marshalNode(company))
    })

    return responseObjects
}
