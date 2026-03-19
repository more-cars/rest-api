import {Node} from "neo4j-driver"
import {ModelCarNode} from "./types/ModelCarNode"
import {DbNodeType} from "../../types/DbNodeType"

export function convertModelCarNeo4jNodeToDbNode(neo4jNode: Node): ModelCarNode {
    return {
        node_type: DbNodeType.ModelCar,
        properties: {
            // system data
            id: neo4jNode.properties.mc_id,
            created_at: neo4jNode.properties.created_at,
            updated_at: neo4jNode.properties.updated_at,
    
            // user data
            name: neo4jNode.properties.name,
            product_code: neo4jNode.properties.product_code,
            release_year: neo4jNode.properties.release_year,
            scale: neo4jNode.properties.scale,
            series: neo4jNode.properties.series,
        },
    } satisfies ModelCarNode
}
