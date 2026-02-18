import type {SessionResultNode} from "../../../../models/session-results/types/SessionResultNode"
import {marshalNodeCollection} from "../../../nodes/marshalNodeCollection"

export function marshalNodes(nodes: SessionResultNode[]) {
    return marshalNodeCollection(nodes)
}
