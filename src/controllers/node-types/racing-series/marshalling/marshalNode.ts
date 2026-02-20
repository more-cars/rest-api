import {RacingSeriesNode} from "../../../../models/node-types/racing-series/types/RacingSeriesNode"
import {marshalSingleNode} from "../../../nodes/marshalSingleNode"
import {RacingSeriesResponse} from "../types/RacingSeriesResponse"

export function marshalNode(node: RacingSeriesNode) {
    return marshalSingleNode({
        id: node.attributes.id,
        name: node.attributes.name,
        short_name: node.attributes.short_name ?? null,
        founded: node.attributes.founded ?? null,
        defunct: node.attributes.defunct ?? null,
        organized_by: node.attributes.organized_by ?? null,
        vehicle_type: node.attributes.vehicle_type ?? null,
        created_at: node.attributes.created_at,
        updated_at: node.attributes.updated_at,
    }) as RacingSeriesResponse
}
