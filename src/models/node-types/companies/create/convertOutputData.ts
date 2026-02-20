import {CompanyNode as CompanyNodeInput} from "../../../../db/nodes/companies/types/CompanyNode"
import {CompanyNode} from "../types/CompanyNode"

export function convertOutputData(data: CompanyNodeInput): CompanyNode {
    return {
        id: data.properties.id,
        name: data.properties.name,
        founded: data.properties.founded,
        defunct: data.properties.defunct,
        headquarters_location: data.properties.headquarters_location,
        legal_headquarters_location: data.properties.legal_headquarters_location,
        created_at: data.properties.created_at,
        updated_at: data.properties.updated_at,
    } as CompanyNode
}
