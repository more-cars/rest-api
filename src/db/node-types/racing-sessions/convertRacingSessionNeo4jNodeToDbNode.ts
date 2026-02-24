import {Node} from "neo4j-driver"
import {RacingSessionNode} from "./types/RacingSessionNode"
import {DbNodeType} from "../../types/DbNodeType"

export function convertRacingSessionNeo4jNodeToDbNode(neo4jNode: Node): RacingSessionNode {
    return {
        node_type: DbNodeType.RacingSession,
        properties: {
            // system data
            id: neo4jNode.properties.mc_id,
            created_at: neo4jNode.properties.created_at,
            updated_at: neo4jNode.properties.updated_at,

            // user data
            name: neo4jNode.properties.name,
            start_date: neo4jNode.properties.start_date,
            start_time: neo4jNode.properties.start_time,
            duration: neo4jNode.properties.duration,
            duration_unit: neo4jNode.properties.duration_unit,
            distance: neo4jNode.properties.distance,
            distance_unit: neo4jNode.properties.distance_unit,
        },
    } satisfies RacingSessionNode
}
