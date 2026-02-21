import {ControllerNodeType} from "../../../nodes/types/ControllerNodeType"

export type RacingGameNode = {
    node_type: ControllerNodeType.RacingGame
    fields: {
        id: number

        name: string
        release_year: number | null
        developer: string | null
        publisher: string | null

        created_at: string
        updated_at: string
    }
}
