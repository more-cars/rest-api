import {ControllerNodeType} from "../../../types/ControllerNodeType"

export type LapTimeNode = {
    node_type: ControllerNodeType.LapTime
    fields: {
        id: number

        time: string
        driver_name: string
        date: string | null

        created_at: string
        updated_at: string
    }
}
