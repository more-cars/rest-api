import {MotorShowNode as MotorShowNodeInput} from "../../../../db/node-types/motor-shows/types/MotorShowNode"
import {MotorShowNode} from "../types/MotorShowNode"
import {ModelNodeType} from "../../../types/ModelNodeType"

export function convertMotorShowDbNodeToModelNode(data: MotorShowNodeInput): MotorShowNode {
    return {
        node_type: ModelNodeType.MotorShow,
        attributes: {
            id: data.properties.id,
            name: data.properties.name,
            date_from: data.properties.date_from,
            date_until: data.properties.date_until,
            location: data.properties.location,
            target_audience: data.properties.target_audience,
            focus: data.properties.focus,
            created_at: data.properties.created_at,
            updated_at: data.properties.updated_at,
        },
    } satisfies MotorShowNode
}
