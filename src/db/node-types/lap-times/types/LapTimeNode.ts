import {DbNodeType} from "../../../types/DbNodeType"

export type LapTimeNode = {
    node_type: DbNodeType.LapTime,
    properties: {
        id: number
        created_at: string
        updated_at: string

        time: string
        driver_name: string
        date: string | null
    }
}
