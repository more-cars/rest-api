import type {CompanyNode} from "../../../../models/node-types/companies/types/CompanyNode"
import {marshalNodeCollection} from "../../../nodes/marshalNodeCollection"

export function marshalNodes(nodes: CompanyNode[]) {
    return marshalNodeCollection(nodes)
}
