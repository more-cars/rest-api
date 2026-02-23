import {DbNodeType} from "../../../types/DbNodeType"

export type RacingGameNode = {
    node_type: DbNodeType.RacingGame,
    properties: {
        id: number
        created_at: string
        updated_at: string

        name: string
        release_year: number | null
        developer: string | null
        publisher: string | null
    }
}
