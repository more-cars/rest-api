import type {ModelNode} from "../../../types/ModelNode"
import type {ModelNodeType} from "../../../types/ModelNodeType"

export interface RacingEventNode extends ModelNode {
    node_type: ModelNodeType.RacingEvent,
    attributes: {
        id: number

        name: string
        round: number | null
        date_from: string | null
        date_to: string | null

        created_at: string
        updated_at: string
    }
}
