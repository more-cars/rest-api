import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import {ControllerNodeType} from "../../types/ControllerNodeType"
import {buildGetCollectionUrl} from "./buildGetCollectionUrl"

export function buildPaginationLinkPrev(nodeType: ControllerNodeType, constraints: NodeCollectionConstraints, totalNodes: number) {
    const modifiedConstraints = Object.assign({}, constraints)
    modifiedConstraints.page = (constraints.page || 1) - 1

    if (modifiedConstraints.page < 1) {
        return null
    }

    if (totalNodes <= (modifiedConstraints.page - 1) * 100) {
        return null
    }

    return buildGetCollectionUrl(nodeType, modifiedConstraints)
}
