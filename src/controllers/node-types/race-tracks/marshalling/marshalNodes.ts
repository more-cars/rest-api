import type {RaceTrackNode} from "../../../../models/node-types/race-tracks/types/RaceTrackNode"
import {marshalNodeCollection} from "../../../nodes/marshalNodeCollection"

export function marshalNodes(nodes: RaceTrackNode[]) {
    return marshalNodeCollection(nodes)
}
