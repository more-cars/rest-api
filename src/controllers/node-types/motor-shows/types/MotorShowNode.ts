import {ControllerNodeType} from "../../../types/ControllerNodeType"

export type MotorShowNode = {
    node_type: ControllerNodeType.MotorShow
    fields: {
        id: number
        name: string
        date_from: string | null
        date_until: string | null
        location: string | null
        target_audience: string | null
        focus: string | null
        country_code: string | null
        created_at: string
        updated_at: string
    }
}
