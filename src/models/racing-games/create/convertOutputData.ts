import {RacingGameNode as RacingGameNodeInput} from "../../../db/nodes/racing-games/types/RacingGameNode"
import {RacingGameNode} from "../types/RacingGameNode"

export function convertOutputData(data: RacingGameNodeInput): RacingGameNode {
    return {
        id: data.id,
        name: data.name,
        release_year: data.release_year,
        developer: data.developer,
        publisher: data.publisher,
        created_at: data.created_at,
        updated_at: data.updated_at,
    } as RacingGameNode
}
