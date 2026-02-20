import {DbNode} from "../../../types/DbNode"
import {DbNodeType} from "../../../types/DbNodeType"

export interface RacingSessionNode extends DbNode {
    node_type: DbNodeType.RacingSession,
    properties: {
        id: number
        created_at: string
        updated_at: string

        name: string
        start_date: string | null
        start_time: string | null
        duration: number | null
        duration_unit: string | null
        distance: number | null
        distance_unit: string | null
    }
}
