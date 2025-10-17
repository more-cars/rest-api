import {CompanyNode as CompanyNodeInput} from "../../../db/nodes/companies/types/CompanyNode"
import {CompanyNode} from "../types/CompanyNode"

export function convertOutputData(data: CompanyNodeInput): CompanyNode {
    return {
        id: data.id,
        name: data.name,
        founded: data.founded,
        defunct: data.defunct,
        headquarters_location: data.headquarters_location,
        legal_headquarters_location: data.legal_headquarters_location,
        created_at: data.created_at,
        updated_at: data.updated_at,
    } as CompanyNode
}
