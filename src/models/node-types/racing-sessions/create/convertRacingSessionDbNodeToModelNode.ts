import {RacingSessionNode as DbRacingSessionNode} from "../../../../db/node-types/racing-sessions/types/RacingSessionNode"
import {RacingSessionNode} from "../types/RacingSessionNode"
import {ModelNodeType} from "../../../types/ModelNodeType"

export function convertRacingSessionDbNodeToModelNode(data: DbRacingSessionNode): RacingSessionNode {
    return {
        node_type: ModelNodeType.RacingSession,
        attributes: {
            id: data.properties.id,
            name: data.properties.name,
            start_date: data.properties.start_date,
            start_time: data.properties.start_time,
            duration: data.properties.duration,
            duration_unit: data.properties.duration_unit,
            distance: data.properties.distance,
            distance_unit: data.properties.distance_unit,
            created_at: data.properties.created_at,
            updated_at: data.properties.updated_at,
        },
    } satisfies RacingSessionNode
}

