import type {RacingSeriesNode} from "../../../../models/racing-series/types/RacingSeriesNode"
import {marshalNodeCollection} from "../../../nodes/marshalNodeCollection"

export function marshalNodes(nodes: RacingSeriesNode[]) {
    return marshalNodeCollection(nodes)
}
