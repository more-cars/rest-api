import {DbNodeType} from "../../../types/DbNodeType"

export type MotorShowNode = {
    node_type: DbNodeType.MotorShow,
    properties: {
        id: number
        created_at: string
        updated_at: string
        name: string
        date_from: string | null
        date_until: string | null
        location: string | null
        target_audience: string | null
        focus: string | null
        country_code: string | null
    }
}
