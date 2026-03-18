import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import {ControllerNodeType} from "../../types/ControllerNodeType"
import {buildGetCollectionUrl} from "./buildGetCollectionUrl"

export function buildPaginationLinkLast(nodeType: ControllerNodeType, constraints: NodeCollectionConstraints, totalNodes: number) {
    const modifiedConstraints = Object.assign({}, constraints)
    modifiedConstraints.page = Math.floor((totalNodes / 100) + 1)

    return buildGetCollectionUrl(nodeType, modifiedConstraints)
}
