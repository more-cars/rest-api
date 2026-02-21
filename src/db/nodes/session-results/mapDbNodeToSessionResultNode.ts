import {Node} from "neo4j-driver"
import {SessionResultNode} from "./types/SessionResultNode"
import {DbNodeType} from "../../types/DbNodeType"

export function mapDbNodeToSessionResultNode(neo4jNode: Node): SessionResultNode {
    return {
        node_type: DbNodeType.SessionResult,
        properties: {
            // system data
            id: neo4jNode.properties.mc_id,
            created_at: neo4jNode.properties.created_at,
            updated_at: neo4jNode.properties.updated_at,

            // user data
            position: neo4jNode.properties.position,
            race_number: neo4jNode.properties.race_number,
            driver_name: neo4jNode.properties.driver_name,
            team_name: neo4jNode.properties.team_name,
            race_time: neo4jNode.properties.race_time,
            laps: neo4jNode.properties.laps,
            status: neo4jNode.properties.status,
            points: neo4jNode.properties.points,
        },
    } satisfies SessionResultNode
}
