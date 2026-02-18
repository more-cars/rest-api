import type {SessionResultNode} from "../../../../models/node-types/session-results/types/SessionResultNode"
import {marshalNodeCollection} from "../../../nodes/marshalNodeCollection"

export function marshalNodes(nodes: SessionResultNode[]) {
    return marshalNodeCollection(nodes)
}
