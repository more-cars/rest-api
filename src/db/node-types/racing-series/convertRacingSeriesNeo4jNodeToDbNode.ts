import {Node} from "neo4j-driver"
import {RacingSeriesNode} from "./types/RacingSeriesNode"
import {DbNodeType} from "../../types/DbNodeType"

export function convertRacingSeriesNeo4jNodeToDbNode(neo4jNode: Node): RacingSeriesNode {
    return {
        node_type: DbNodeType.RacingSeries,
        properties: {
            // system data
            id: neo4jNode.properties.mc_id,
            created_at: neo4jNode.properties.created_at,
            updated_at: neo4jNode.properties.updated_at,

            // user data
            name: neo4jNode.properties.name,
            short_name: neo4jNode.properties.short_name,
            founded: neo4jNode.properties.founded,
            defunct: neo4jNode.properties.defunct,
            organized_by: neo4jNode.properties.organized_by,
            vehicle_type: neo4jNode.properties.vehicle_type,
        },
    } satisfies RacingSeriesNode
}
