import type {BrandNode} from "../../../models/brands/types/BrandNode"
import {marshalNodeCollection} from "../../nodes/marshalNodeCollection"

export function marshalNodes(nodes: BrandNode[]) {
    return marshalNodeCollection(nodes)
}
