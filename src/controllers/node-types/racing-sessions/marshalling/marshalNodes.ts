import type {RacingSessionNode} from "../../../../models/racing-sessions/types/RacingSessionNode"
import {marshalNodeCollection} from "../../../nodes/marshalNodeCollection"

export function marshalNodes(nodes: RacingSessionNode[]) {
    return marshalNodeCollection(nodes)
}
