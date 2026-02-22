import type {ModelNodeType} from "../../../types/ModelNodeType"

export type RacingEventNode = {
    node_type: ModelNodeType.RacingEvent,
    attributes: {
        id: number

        name: string
        round: number | null
        date_from: string | null
        date_to: string | null

        created_at: string
        updated_at: string
    }
}
