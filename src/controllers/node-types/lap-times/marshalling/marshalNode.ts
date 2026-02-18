import {LapTimeNode} from "../../../../models/node-types/lap-times/types/LapTimeNode"
import {marshalSingleNode} from "../../../nodes/marshalSingleNode"
import {LapTimeResponse} from "../types/LapTimeResponse"

export function marshalNode(node: LapTimeNode) {
    return marshalSingleNode({
        id: node.id,
        time: node.time,
        driver_name: node.driver_name,
        date: node.date ?? null,
        created_at: node.created_at,
        updated_at: node.updated_at,
    }) as LapTimeResponse
}
