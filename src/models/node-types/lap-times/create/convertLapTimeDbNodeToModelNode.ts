import {LapTimeNode as DbLapTimeNode} from "../../../../db/nodes/lap-times/types/LapTimeNode"
import {LapTimeNode} from "../types/LapTimeNode"
import {ModelNodeType} from "../../../types/ModelNodeType"

export function convertLapTimeDbNodeToModelNode(data: DbLapTimeNode): LapTimeNode {
    return {
        node_type: ModelNodeType.LapTime,
        attributes: {
            id: data.properties.id,
            time: data.properties.time,
            driver_name: data.properties.driver_name,
            date: data.properties.date,
            created_at: data.properties.created_at,
            updated_at: data.properties.updated_at,
        },
    } satisfies LapTimeNode
}
