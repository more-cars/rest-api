import {ControllerNodeType} from "../../../nodes/types/ControllerNodeType"

export type RacingEventNode = {
    node_type: ControllerNodeType.RacingEvent
    fields: {
        id: number

        name: string
        round: number | null
        date_from: string | null
        date_to: string | null

        created_at: string
        updated_at: string
    }
}
