import {Node} from "neo4j-driver"
import {RaceTrackNode} from "./types/RaceTrackNode"

export function mapDbNodeToRaceTrackNode(dbNode: Node): RaceTrackNode {
    return {
        // system data
        id: dbNode.properties.mc_id,
        created_at: dbNode.properties.created_at,
        updated_at: dbNode.properties.updated_at,

        // user data
        name: dbNode.properties.name,
        opened: dbNode.properties.opened,
        closed: dbNode.properties.closed,
        type: dbNode.properties.type,
        location: dbNode.properties.location,
        geo_position: dbNode.properties.geo_position,
    } as RaceTrackNode
}
