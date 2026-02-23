import {CompanyNode as DbCompanyNode} from "../../../../db/node-types/companies/types/CompanyNode"
import {CompanyNode} from "../types/CompanyNode"
import {ModelNodeType} from "../../../types/ModelNodeType"

export function convertCompanyDbNodeToModelNode(data: DbCompanyNode): CompanyNode {
    return {
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
        },
    } satisfies CompanyNode
}
