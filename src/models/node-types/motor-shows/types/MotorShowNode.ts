import type {ModelNodeType} from "../../../types/ModelNodeType"

export type MotorShowNode = {
    node_type: ModelNodeType.MotorShow
    attributes: {
        id: number
        name: string
        date_from: string | null
        date_until: string | null
        location: string | null
        target_audience: string | null
        focus: string | null

        created_at: string
        updated_at: string
    }
}
