import {RacingGameNode as DbRacingGameNode} from "../../../../db/nodes/racing-games/types/RacingGameNode"
import {RacingGameNode} from "../types/RacingGameNode"
import {ModelNodeType} from "../../../types/ModelNodeType"

export function convertRacingGameDbNodeToModelNode(data: DbRacingGameNode): RacingGameNode {
    const node: RacingGameNode = {
        node_type: ModelNodeType.RacingGame,
        attributes: {
            id: data.properties.id,
            name: data.properties.name,
            release_year: data.properties.release_year,
            developer: data.properties.developer,
            publisher: data.properties.publisher,
            created_at: data.properties.created_at,
            updated_at: data.properties.updated_at,
        }
    }

    return node
}
