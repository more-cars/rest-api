import {Node} from "neo4j-driver"
import {RacingSessionNode} from "./types/RacingSessionNode"

export function mapDbNodeToRacingSessionNode(dbNode: Node): RacingSessionNode {
    return {
        // system data
        id: dbNode.properties.mc_id,
        created_at: dbNode.properties.created_at,
        updated_at: dbNode.properties.updated_at,

        // user data
        name: dbNode.properties.name,
        start_date: dbNode.properties.start_date,
        start_time: dbNode.properties.start_time,
        duration: dbNode.properties.duration,
        duration_unit: dbNode.properties.duration_unit,
        distance: dbNode.properties.distance,
        distance_unit: dbNode.properties.distance_unit,
    } as RacingSessionNode
}
