import {ControllerNodeType} from "../../../types/ControllerNodeType"

export type RacingSeriesNode = {
    node_type: ControllerNodeType.RacingSeries
    fields: {
        id: number

        name: string
        short_name: string | null
        founded: number | null
        defunct: number | null
        organized_by: string | null
        vehicle_type: string | null

        created_at: string
        updated_at: string
    }
}
