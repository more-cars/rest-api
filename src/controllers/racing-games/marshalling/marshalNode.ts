import {RacingGameNode} from "../../../models/racing-games/types/RacingGameNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {RacingGameResponse} from "../types/RacingGameResponse"

export function marshalNode(node: RacingGameNode) {
    return marshalSingleNode({
        id: node.id,
        name: node.name,
        release_year: node.release_year ?? null,
        developer: node.developer ?? null,
        publisher: node.publisher ?? null,
        created_at: node.created_at,
        updated_at: node.updated_at,
    }) as RacingGameResponse
}
