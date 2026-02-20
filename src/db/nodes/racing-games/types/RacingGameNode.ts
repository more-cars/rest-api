import {DbNode} from "../../../types/DbNode"
import {DbNodeType} from "../../../types/DbNodeType"

export interface RacingGameNode extends DbNode {
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
