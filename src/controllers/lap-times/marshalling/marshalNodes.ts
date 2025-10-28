import type {LapTimeNode} from "../../../models/lap-times/types/LapTimeNode"
import {marshalNodeCollection} from "../../nodes/marshalNodeCollection"

export function marshalNodes(nodes: LapTimeNode[]) {
    return marshalNodeCollection(nodes)
}
