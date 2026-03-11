import {Node} from "neo4j-driver"
import {MotorShowNode} from "./types/MotorShowNode"
import {DbNodeType} from "../../types/DbNodeType"

export function convertMotorShowNeo4jNodeToDbNode(neo4jNode: Node): MotorShowNode {
    return {
        node_type: DbNodeType.MotorShow,
        properties: {
            // system data
            id: neo4jNode.properties.mc_id,
            created_at: neo4jNode.properties.created_at,
            updated_at: neo4jNode.properties.updated_at,
    
            // user data
            name: neo4jNode.properties.name,
            date_from: neo4jNode.properties.date_from,
            date_until: neo4jNode.properties.date_until,
            location: neo4jNode.properties.location,
            target_audience: neo4jNode.properties.target_audience,
            focus: neo4jNode.properties.focus,
        },
    } satisfies MotorShowNode
}
