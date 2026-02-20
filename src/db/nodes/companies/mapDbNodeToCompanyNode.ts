import {Node} from "neo4j-driver"
import {CompanyNode} from "./types/CompanyNode"
import {DbNodeType} from "../../types/DbNodeType"

export function mapDbNodeToCompanyNode(neo4jNode: Node): CompanyNode {
    const node: CompanyNode = {
        node_type: DbNodeType.Company,
        properties: {
            // system data
            id: neo4jNode.properties.mc_id,
            created_at: neo4jNode.properties.created_at,
            updated_at: neo4jNode.properties.updated_at,

            // user data
            name: neo4jNode.properties.name,
            founded: neo4jNode.properties.founded,
            defunct: neo4jNode.properties.defunct,
            headquarters_location: neo4jNode.properties.headquarters_location,
            legal_headquarters_location: neo4jNode.properties.legal_headquarters_location,
        }
    }

    return node
}
