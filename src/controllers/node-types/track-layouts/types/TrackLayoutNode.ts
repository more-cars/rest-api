import {ControllerNodeType} from "../../../types/ControllerNodeType"

export type TrackLayoutNode = {
    node_type: ControllerNodeType.TrackLayout
    fields: {
        id: number

        name: string
        year_from: number | null
        year_to: number | null
        length: number | null
        length_unit: string | null
        direction: string | null
        elevation_change: number | null
        elevation_change_unit: string | null
        surface: string | null

        created_at: string
        updated_at: string
    }
}
