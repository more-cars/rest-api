import {Node} from "neo4j-driver"
import {RaceTrackNode} from "./types/RaceTrackNode"
import {DbNodeType} from "../../types/DbNodeType"

export function convertRaceTrackNeo4jNodeToDbNode(neo4jNode: Node): RaceTrackNode {
    return {
        node_type: DbNodeType.RaceTrack,
        properties: {
            // system data
            id: neo4jNode.properties.mc_id,
            created_at: neo4jNode.properties.created_at,
            updated_at: neo4jNode.properties.updated_at,

            // user data
            name: neo4jNode.properties.name,
            opened: neo4jNode.properties.opened,
            closed: neo4jNode.properties.closed,
            type: neo4jNode.properties.type,
            location: neo4jNode.properties.location,
            geo_position: neo4jNode.properties.geo_position,
        },
    } satisfies RaceTrackNode
}
