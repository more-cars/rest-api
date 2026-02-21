import {ControllerNodeType} from "../../../nodes/types/ControllerNodeType"

export type CarModelNode = {
    node_type: ControllerNodeType.CarModel
    fields: {
        id: number

        name: string
        built_from: number | null
        built_to: number | null
        generation: number | null
        internal_code: string | null
        total_production: number | null

        created_at: string
        updated_at: string
    }
}
