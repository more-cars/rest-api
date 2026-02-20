import {ModelNodeType} from "../../../types/ModelNodeType"

export type RacingGameNode = {
    node_type: ModelNodeType.RacingGame,
    attributes: {
        id: number

        name: string
        release_year: number | null
        developer: string | null
        publisher: string | null

        created_at: string
        updated_at: string
    }
}
