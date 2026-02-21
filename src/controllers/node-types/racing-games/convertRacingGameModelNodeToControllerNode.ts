import type {RacingGameNode as ModelRacingGameNode} from "../../../models/node-types/racing-games/types/RacingGameNode"
import type {RacingGameNode} from "./types/RacingGameNode"
import {ControllerNodeType} from "../../nodes/types/ControllerNodeType"

export function convertRacingGameModelNodeToControllerNode(modelNode: ModelRacingGameNode): RacingGameNode {
    return {
        node_type: ControllerNodeType.RacingGame,
        fields: {
            id: modelNode.attributes.id,
            name: modelNode.attributes.name,
            release_year: modelNode.attributes.release_year ?? null,
            developer: modelNode.attributes.developer ?? null,
            publisher: modelNode.attributes.publisher ?? null,
            created_at: modelNode.attributes.created_at,
            updated_at: modelNode.attributes.updated_at,
        },
    } satisfies RacingGameNode
}
