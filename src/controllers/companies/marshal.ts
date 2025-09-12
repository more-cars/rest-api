import {CompanyResponse} from "./types/CompanyResponse"
import {CompanyNode} from "../../models/companies/types/CompanyNode"

export function marshal(node: CompanyNode) {
    return {
        id: node.id,
        name: node.name,
        founded: node.founded ?? null,
        defunct: node.defunct ?? null,
        headquarters_location: node.headquarters_location ?? null,
        legal_headquarters_location: node.legal_headquarters_location ?? null,
        created_at: node.created_at,
        updated_at: node.updated_at,
    } as CompanyResponse
}
