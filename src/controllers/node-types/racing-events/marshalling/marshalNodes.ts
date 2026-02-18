import type {RacingEventNode} from "../../../../models/node-types/racing-events/types/RacingEventNode"
import {marshalNodeCollection} from "../../../nodes/marshalNodeCollection"

export function marshalNodes(nodes: RacingEventNode[]) {
    return marshalNodeCollection(nodes)
}
