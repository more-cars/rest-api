import type {CarModelVariantNode} from "../../../../models/node-types/car-model-variants/types/CarModelVariantNode"
import {marshalNodeCollection} from "../../../nodes/marshalNodeCollection"

export function marshalNodes(nodes: CarModelVariantNode[]) {
    return marshalNodeCollection(nodes)
}
