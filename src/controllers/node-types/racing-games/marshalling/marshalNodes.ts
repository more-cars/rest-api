import type {RacingGameNode} from "../../../../models/node-types/racing-games/types/RacingGameNode"
import {marshalNodeCollection} from "../../../nodes/marshalNodeCollection"

export function marshalNodes(nodes: RacingGameNode[]) {
    return marshalNodeCollection(nodes)
}
