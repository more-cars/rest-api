import {Node} from "neo4j-driver"
import {TrackLayoutNode} from "./types/TrackLayoutNode"

export function mapDbNodeToTrackLayoutNode(dbNode: Node): TrackLayoutNode {
    return {
        // system data
        id: dbNode.properties.mc_id,
        created_at: dbNode.properties.created_at,
        updated_at: dbNode.properties.updated_at,

        // user data
        name: dbNode.properties.name,
        year_from: dbNode.properties.year_from,
        year_to: dbNode.properties.year_to,
        length: dbNode.properties.length,
        length_unit: dbNode.properties.length_unit,
        direction: dbNode.properties.direction,
        elevation_change: dbNode.properties.elevation_change,
        elevation_change_unit: dbNode.properties.elevation_change_unit,
        surface: dbNode.properties.surface,
    } as TrackLayoutNode
}
