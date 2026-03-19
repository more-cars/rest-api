import {Node} from "neo4j-driver"
import {ModelCarBrandNode} from "./types/ModelCarBrandNode"
import {DbNodeType} from "../../types/DbNodeType"

export function convertModelCarBrandNeo4jNodeToDbNode(neo4jNode: Node): ModelCarBrandNode {
    return {
        node_type: DbNodeType.ModelCarBrand,
        properties: {
            // system data
            id: neo4jNode.properties.mc_id,
            created_at: neo4jNode.properties.created_at,
            updated_at: neo4jNode.properties.updated_at,
    
            // user data
            name: neo4jNode.properties.name,
            founded: neo4jNode.properties.founded,
            defunct: neo4jNode.properties.defunct,
        },
    } satisfies ModelCarBrandNode
}
