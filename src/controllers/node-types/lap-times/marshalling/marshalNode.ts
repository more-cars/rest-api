import {LapTimeNode} from "../../../../models/node-types/lap-times/types/LapTimeNode"
import {marshalSingleNode} from "../../../nodes/marshalSingleNode"
import {LapTimeResponse} from "../types/LapTimeResponse"

export function marshalNode(node: LapTimeNode) {
    return marshalSingleNode({
        id: node.attributes.id,
        time: node.attributes.time,
        driver_name: node.attributes.driver_name,
        date: node.attributes.date ?? null,
        created_at: node.attributes.created_at,
        updated_at: node.attributes.updated_at,
    }) as LapTimeResponse
}
