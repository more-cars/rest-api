import {ModelNodeType} from "../../../types/ModelNodeType"

export type LapTimeNode = {
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
