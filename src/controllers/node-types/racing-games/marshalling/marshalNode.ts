import {RacingGameNode} from "../../../../models/node-types/racing-games/types/RacingGameNode"
import {marshalSingleNode} from "../../../nodes/marshalSingleNode"
import {RacingGameResponse} from "../types/RacingGameResponse"

export function marshalNode(node: RacingGameNode) {
    return marshalSingleNode({
        id: node.attributes.id,
        name: node.attributes.name,
        release_year: node.attributes.release_year ?? null,
        developer: node.attributes.developer ?? null,
        publisher: node.attributes.publisher ?? null,
        created_at: node.attributes.created_at,
        updated_at: node.attributes.updated_at,
    }) as RacingGameResponse
}
