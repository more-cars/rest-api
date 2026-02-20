import {CompanyNode} from "../../../../models/node-types/companies/types/CompanyNode"
import {marshalSingleNode} from "../../../nodes/marshalSingleNode"
import type {CompanyResponse} from "../types/CompanyResponse"

export function marshalNode(node: CompanyNode) {
    return marshalSingleNode({
        id: node.attributes.id,
        name: node.attributes.name,
        founded: node.attributes.founded ?? null,
        defunct: node.attributes.defunct ?? null,
        headquarters_location: node.attributes.headquarters_location ?? null,
        legal_headquarters_location: node.attributes.legal_headquarters_location ?? null,
        created_at: node.attributes.created_at,
        updated_at: node.attributes.updated_at,
    }) as CompanyResponse
}
