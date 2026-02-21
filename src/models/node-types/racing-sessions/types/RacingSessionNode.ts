import type {ModelNode} from "../../../types/ModelNode"
import type {ModelNodeType} from "../../../types/ModelNodeType"

export interface RacingSessionNode extends ModelNode {
    node_type: ModelNodeType.RacingSession,
    attributes: {
        id: number

        name: string
        start_date: string | null
        start_time: string | null
        duration: number | null
        duration_unit: string | null
        distance: number | null
        distance_unit: string | null

        created_at: string
        updated_at: string
    }
}
