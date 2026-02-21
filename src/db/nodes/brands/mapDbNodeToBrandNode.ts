import {Node} from "neo4j-driver"
import {BrandNode} from "./types/BrandNode"
import {DbNodeType} from "../../types/DbNodeType"

export function mapDbNodeToBrandNode(neo4jNode: Node): BrandNode {
    return {
        node_type: DbNodeType.Brand,
        properties: {
            // system data
            id: neo4jNode.properties.mc_id,
            created_at: neo4jNode.properties.created_at,
            updated_at: neo4jNode.properties.updated_at,

            // user data
            name: neo4jNode.properties.name,
            full_name: neo4jNode.properties.full_name,
            founded: neo4jNode.properties.founded,
            defunct: neo4jNode.properties.defunct,
            wmi: neo4jNode.properties.wmi,
            hsn: neo4jNode.properties.hsn,
        },
    } satisfies BrandNode
}
