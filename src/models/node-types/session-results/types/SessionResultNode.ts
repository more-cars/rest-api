import type {ModelNode} from "../../../types/ModelNode"
import type {ModelNodeType} from "../../../types/ModelNodeType"

export interface SessionResultNode extends ModelNode {
    node_type: ModelNodeType.SessionResult,
    attributes: {
        id: number

        position: number
        race_number: string | null
        driver_name: string
        team_name: string | null
        race_time: string | null
        laps: number | null
        status: string | null
        points: number | null

        created_at: string
        updated_at: string
    }
}
