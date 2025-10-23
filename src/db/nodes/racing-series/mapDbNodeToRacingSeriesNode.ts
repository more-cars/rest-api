import {Node} from "neo4j-driver"
import {RacingSeriesNode} from "./types/RacingSeriesNode"

export function mapDbNodeToRacingSeriesNode(dbNode: Node): RacingSeriesNode {
    return {
        // system data
        id: dbNode.properties.mc_id,
        created_at: dbNode.properties.created_at,
        updated_at: dbNode.properties.updated_at,

        // user data
        name: dbNode.properties.name,
        short_name: dbNode.properties.short_name,
        founded: dbNode.properties.founded,
        defunct: dbNode.properties.defunct,
        organized_by: dbNode.properties.organized_by,
        vehicle_type: dbNode.properties.vehicle_type,
    } as RacingSeriesNode
}
