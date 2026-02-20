import {DbNode} from "../../../types/DbNode"
import {DbNodeType} from "../../../types/DbNodeType"

export interface RacingEventNode extends DbNode {
    node_type: DbNodeType.RacingEvent,
    properties: {
        id: number
        created_at: string
        updated_at: string

        name: string
        round: number | null
        date_from: string | null
        date_to: string | null
    }
}
