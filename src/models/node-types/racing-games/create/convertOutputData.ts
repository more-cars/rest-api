import {RacingGameNode as RacingGameNodeInput} from "../../../../db/nodes/racing-games/types/RacingGameNode"
import {RacingGameNode} from "../types/RacingGameNode"

export function convertOutputData(data: RacingGameNodeInput): RacingGameNode {
    return {
        id: data.properties.id,
        name: data.properties.name,
        release_year: data.properties.release_year,
        developer: data.properties.developer,
        publisher: data.properties.publisher,
        created_at: data.properties.created_at,
        updated_at: data.properties.updated_at,
    } as RacingGameNode
}
