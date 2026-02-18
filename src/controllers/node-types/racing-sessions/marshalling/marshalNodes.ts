import type {RacingSessionNode} from "../../../../models/node-types/racing-sessions/types/RacingSessionNode"
import {marshalNodeCollection} from "../../../nodes/marshalNodeCollection"

export function marshalNodes(nodes: RacingSessionNode[]) {
    return marshalNodeCollection(nodes)
}
