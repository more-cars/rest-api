import type {TrackLayoutNode} from "../../../../models/node-types/track-layouts/types/TrackLayoutNode"
import {marshalNodeCollection} from "../../../nodes/marshalNodeCollection"

export function marshalNodes(nodes: TrackLayoutNode[]) {
    return marshalNodeCollection(nodes)
}
