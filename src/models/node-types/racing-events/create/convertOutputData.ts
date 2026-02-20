import {RacingEventNode as DbRacingEventNode} from "../../../../db/nodes/racing-events/types/RacingEventNode"
import {RacingEventNode} from "../types/RacingEventNode"
import {ModelNodeType} from "../../../types/ModelNodeType"

export function convertOutputData(data: DbRacingEventNode): RacingEventNode {
    const node: RacingEventNode = {
        node_type: ModelNodeType.RacingEvent,
        attributes: {
            id: data.properties.id,
            name: data.properties.name,
            round: data.properties.round,
            date_from: data.properties.date_from,
            date_to: data.properties.date_to,
            created_at: data.properties.created_at,
            updated_at: data.properties.updated_at,
        }
    }

    return node
}
