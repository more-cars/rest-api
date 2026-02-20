import {CompanyNode as DbCompanyNode} from "../../../../db/nodes/companies/types/CompanyNode"
import {CompanyNode} from "../types/CompanyNode"
import {ModelNodeType} from "../../../types/ModelNodeType"

export function convertOutputData(data: DbCompanyNode): CompanyNode {
    const node: CompanyNode = {
        node_type: ModelNodeType.Company,
        attributes: {
            id: data.properties.id,
            name: data.properties.name,
            founded: data.properties.founded,
            defunct: data.properties.defunct,
            headquarters_location: data.properties.headquarters_location,
            legal_headquarters_location: data.properties.legal_headquarters_location,
            created_at: data.properties.created_at,
            updated_at: data.properties.updated_at,
        }
    }

    return node
}
