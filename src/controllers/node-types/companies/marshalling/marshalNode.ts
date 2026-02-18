import {CompanyNode} from "../../../../models/node-types/companies/types/CompanyNode"
import {marshalSingleNode} from "../../../nodes/marshalSingleNode"
import type {CompanyResponse} from "../types/CompanyResponse"

export function marshalNode(node: CompanyNode) {
    return marshalSingleNode({
        id: node.id,
        name: node.name,
        founded: node.founded ?? null,
        defunct: node.defunct ?? null,
        headquarters_location: node.headquarters_location ?? null,
        legal_headquarters_location: node.legal_headquarters_location ?? null,
        created_at: node.created_at,
        updated_at: node.updated_at,
    }) as CompanyResponse
}
