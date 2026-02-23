import {Node} from "neo4j-driver"
import {RacingEventNode} from "./types/RacingEventNode"
import {DbNodeType} from "../../types/DbNodeType"

export function mapDbNodeToRacingEventNode(neo4jNode: Node): RacingEventNode {
    return {
        node_type: DbNodeType.RacingEvent,
        properties: {
            // system data
            id: neo4jNode.properties.mc_id,
            created_at: neo4jNode.properties.created_at,
            updated_at: neo4jNode.properties.updated_at,

            // user data
            name: neo4jNode.properties.name,
            round: neo4jNode.properties.round,
            date_from: neo4jNode.properties.date_from,
            date_to: neo4jNode.properties.date_to,
        },
    } satisfies RacingEventNode
}

