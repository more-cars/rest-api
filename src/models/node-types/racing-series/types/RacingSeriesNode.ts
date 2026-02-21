import type {ModelNode} from "../../../types/ModelNode"
import type {ModelNodeType} from "../../../types/ModelNodeType"

export interface RacingSeriesNode extends ModelNode {
    node_type: ModelNodeType.RacingSeries,
    attributes: {
        id: number

        name: string
        short_name: string | null
        founded: number | null
        defunct: number | null
        organized_by: string | null
        vehicle_type: string | null

        created_at: string
        updated_at: string
    }
}
