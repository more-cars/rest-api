import type {RaceTrackNode} from "../../../models/race-tracks/types/RaceTrackNode"
import {marshalNodeCollection} from "../../nodes/marshalNodeCollection"

export function marshalNodes(nodes: RaceTrackNode[]) {
    return marshalNodeCollection(nodes)
}
