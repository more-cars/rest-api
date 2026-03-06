import {Node} from "neo4j-driver"
import {RatingNode} from "./types/RatingNode"
import {DbNodeType} from "../../types/DbNodeType"

export function convertRatingNeo4jNodeToDbNode(neo4jNode: Node): RatingNode {
    return {
        node_type: DbNodeType.Rating,
        properties: {
            // system data
            id: neo4jNode.properties.mc_id,
            created_at: neo4jNode.properties.created_at,
            updated_at: neo4jNode.properties.updated_at,
    
            // user data
            rating_value: neo4jNode.properties.rating_value,
            scale_minimum: neo4jNode.properties.scale_minimum,
            scale_maximum: neo4jNode.properties.scale_maximum,
            scale_direction: neo4jNode.properties.scale_direction,
        },
    } satisfies RatingNode
}
