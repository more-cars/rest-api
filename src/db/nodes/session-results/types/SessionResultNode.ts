import {DbNode} from "../../../types/DbNode"
import {DbNodeType} from "../../../types/DbNodeType"

export interface SessionResultNode extends DbNode {
    node_type: DbNodeType.SessionResult,
    properties: {
        id: number
        created_at: string
        updated_at: string

        position: number
        race_number: string | null
        driver_name: string
        team_name: string | null
        race_time: string | null
        laps: number | null
        status: string | null
        points: number | null
    }
}
