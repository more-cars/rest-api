import type {RacingEventNode} from "../../../../models/racing-events/types/RacingEventNode"
import {marshalNodeCollection} from "../../../nodes/marshalNodeCollection"

export function marshalNodes(nodes: RacingEventNode[]) {
    return marshalNodeCollection(nodes)
}
