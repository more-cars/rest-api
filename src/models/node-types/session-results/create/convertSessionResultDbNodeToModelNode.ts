import {SessionResultNode as DbSessionResultNode} from "../../../../db/nodes/session-results/types/SessionResultNode"
import {SessionResultNode} from "../types/SessionResultNode"
import {ModelNodeType} from "../../../types/ModelNodeType"

export function convertSessionResultDbNodeToModelNode(data: DbSessionResultNode): SessionResultNode {
    return {
        node_type: ModelNodeType.SessionResult,
        attributes: {
            id: data.properties.id,
            position: data.properties.position,
            race_number: data.properties.race_number,
            driver_name: data.properties.driver_name,
            team_name: data.properties.team_name,
            race_time: data.properties.race_time,
            laps: data.properties.laps,
            status: data.properties.status,
            points: data.properties.points,
            created_at: data.properties.created_at,
            updated_at: data.properties.updated_at,
        },
    } satisfies SessionResultNode
}
