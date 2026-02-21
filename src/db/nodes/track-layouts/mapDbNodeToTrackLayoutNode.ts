import {Node} from "neo4j-driver"
import {TrackLayoutNode} from "./types/TrackLayoutNode"
import {DbNodeType} from "../../types/DbNodeType"

export function mapDbNodeToTrackLayoutNode(neo4jNode: Node): TrackLayoutNode {
    return {
        node_type: DbNodeType.TrackLayout,
        properties: {
            // system data
            id: neo4jNode.properties.mc_id,
            created_at: neo4jNode.properties.created_at,
            updated_at: neo4jNode.properties.updated_at,

            // user data
            name: neo4jNode.properties.name,
            year_from: neo4jNode.properties.year_from,
            year_to: neo4jNode.properties.year_to,
            length: neo4jNode.properties.length,
            length_unit: neo4jNode.properties.length_unit,
            direction: neo4jNode.properties.direction,
            elevation_change: neo4jNode.properties.elevation_change,
            elevation_change_unit: neo4jNode.properties.elevation_change_unit,
            surface: neo4jNode.properties.surface,
        },
    } satisfies TrackLayoutNode
}
