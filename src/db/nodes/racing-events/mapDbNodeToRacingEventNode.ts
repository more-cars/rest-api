import {Node} from "neo4j-driver"
import {RacingEventNode} from "./types/RacingEventNode"

export function mapDbNodeToRacingEventNode(dbNode: Node): RacingEventNode {
    return {
        // system data
        id: dbNode.properties.mc_id,
        created_at: dbNode.properties.created_at,
        updated_at: dbNode.properties.updated_at,

        // user data
        name: dbNode.properties.name,
        round: dbNode.properties.round,
        date_from: dbNode.properties.date_from,
        date_to: dbNode.properties.date_to,
    } as RacingEventNode
}
