import type {RacingSeriesNode} from "../../../../models/node-types/racing-series/types/RacingSeriesNode"
import {marshalNodeCollection} from "../../../nodes/marshalNodeCollection"

export function marshalNodes(nodes: RacingSeriesNode[]) {
    return marshalNodeCollection(nodes)
}
