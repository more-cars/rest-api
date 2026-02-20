import {RacingEventNode} from "../../../../models/node-types/racing-events/types/RacingEventNode"
import {marshalSingleNode} from "../../../nodes/marshalSingleNode"
import {RacingEventResponse} from "../types/RacingEventResponse"

export function marshalNode(node: RacingEventNode) {
    return marshalSingleNode({
        id: node.attributes.id,
        name: node.attributes.name,
        round: node.attributes.round ?? null,
        date_from: node.attributes.date_from ?? null,
        date_to: node.attributes.date_to ?? null,
        created_at: node.attributes.created_at,
        updated_at: node.attributes.updated_at,
    }) as RacingEventResponse
}
