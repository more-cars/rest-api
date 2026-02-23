import {Node} from "neo4j-driver"
import {CarModelNode} from "./types/CarModelNode"
import {DbNodeType} from "../../types/DbNodeType"

export function mapDbNodeToCarModelNode(neo4jNode: Node): CarModelNode {
    return {
        node_type: DbNodeType.CarModel,
        properties: {
            // system data
            id: neo4jNode.properties.mc_id,
            created_at: neo4jNode.properties.created_at,
            updated_at: neo4jNode.properties.updated_at,

            // user data
            name: neo4jNode.properties.name,
            built_from: neo4jNode.properties.built_from,
            built_to: neo4jNode.properties.built_to,
            generation: neo4jNode.properties.generation,
            internal_code: neo4jNode.properties.internal_code,
            total_production: neo4jNode.properties.total_production,
        },
    } satisfies CarModelNode
}
