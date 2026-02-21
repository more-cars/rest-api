import type {ModelNode} from "../../../types/ModelNode"
import type {ModelNodeType} from "../../../types/ModelNodeType"

export interface LapTimeNode extends ModelNode {
    node_type: ModelNodeType.LapTime,
    attributes: {
        id: number

        time: string
        driver_name: string
        date: string | null

        created_at: string
        updated_at: string
    }
}
