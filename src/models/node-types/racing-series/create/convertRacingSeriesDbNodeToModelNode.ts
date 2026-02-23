import {RacingSeriesNode as DbRacingSeriesNode} from "../../../../db/node-types/racing-series/types/RacingSeriesNode"
import {RacingSeriesNode} from "../types/RacingSeriesNode"
import {ModelNodeType} from "../../../types/ModelNodeType"

export function convertRacingSeriesDbNodeToModelNode(data: DbRacingSeriesNode): RacingSeriesNode {
    return {
        node_type: ModelNodeType.RacingSeries,
        attributes: {
            id: data.properties.id,
            name: data.properties.name,
            short_name: data.properties.short_name,
            founded: data.properties.founded,
            defunct: data.properties.defunct,
            organized_by: data.properties.organized_by,
            vehicle_type: data.properties.vehicle_type,
            created_at: data.properties.created_at,
            updated_at: data.properties.updated_at,
        },
    } satisfies RacingSeriesNode
}
