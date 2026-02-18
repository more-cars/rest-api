import type {CarModelNode} from "../../../../models/car-models/types/CarModelNode"
import {marshalNodeCollection} from "../../../nodes/marshalNodeCollection"

export function marshalNodes(nodes: CarModelNode[]) {
    return marshalNodeCollection(nodes)
}
