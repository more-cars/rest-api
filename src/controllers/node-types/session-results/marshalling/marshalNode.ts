import {SessionResultNode} from "../../../../models/node-types/session-results/types/SessionResultNode"
import {marshalSingleNode} from "../../../nodes/marshalSingleNode"
import {SessionResultResponse} from "../types/SessionResultResponse"

export function marshalNode(node: SessionResultNode) {
    return marshalSingleNode({
        id: node.attributes.id,
        position: node.attributes.position,
        race_number: node.attributes.race_number ?? null,
        driver_name: node.attributes.driver_name,
        team_name: node.attributes.team_name ?? null,
        race_time: node.attributes.race_time ?? null,
        laps: node.attributes.laps ?? null,
        status: node.attributes.status ?? null,
        points: node.attributes.points ?? null,
        created_at: node.attributes.created_at,
        updated_at: node.attributes.updated_at,
    }) as SessionResultResponse
}
