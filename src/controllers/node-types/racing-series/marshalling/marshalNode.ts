import {RacingSeriesNode} from "../../../../models/node-types/racing-series/types/RacingSeriesNode"
import {marshalSingleNode} from "../../../nodes/marshalSingleNode"
import {RacingSeriesResponse} from "../types/RacingSeriesResponse"

export function marshalNode(node: RacingSeriesNode) {
    return marshalSingleNode({
        id: node.id,
        name: node.name,
        short_name: node.short_name ?? null,
        founded: node.founded ?? null,
        defunct: node.defunct ?? null,
        organized_by: node.organized_by ?? null,
        vehicle_type: node.vehicle_type ?? null,
        created_at: node.created_at,
        updated_at: node.updated_at,
    }) as RacingSeriesResponse
}
