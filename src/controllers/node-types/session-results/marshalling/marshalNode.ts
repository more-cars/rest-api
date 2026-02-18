import {SessionResultNode} from "../../../../models/node-types/session-results/types/SessionResultNode"
import {marshalSingleNode} from "../../../nodes/marshalSingleNode"
import {SessionResultResponse} from "../types/SessionResultResponse"

export function marshalNode(node: SessionResultNode) {
    return marshalSingleNode({
        id: node.id,
        position: node.position,
        race_number: node.race_number ?? null,
        driver_name: node.driver_name,
        team_name: node.team_name ?? null,
        race_time: node.race_time ?? null,
        laps: node.laps ?? null,
        status: node.status ?? null,
        points: node.points ?? null,
        created_at: node.created_at,
        updated_at: node.updated_at,
    }) as SessionResultResponse
}
