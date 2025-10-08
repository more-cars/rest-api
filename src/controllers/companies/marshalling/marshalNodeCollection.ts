import {CompanyNode} from "../../../models/companies/types/CompanyNode"
import {marshalNode} from "./marshalNode"
import {CompanyResponse} from "../types/CompanyResponse"

export function marshalNodeCollection(nodes: Array<CompanyNode>) {
    const responseObjects: Array<CompanyResponse> = []

    nodes.forEach((node: CompanyNode) => {
        responseObjects.push(marshalNode(node))
    })

    return responseObjects
}
