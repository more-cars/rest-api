import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import {ControllerNodeType} from "../../types/ControllerNodeType"
import {buildGetCollectionUrl} from "./buildGetCollectionUrl"

export function buildPaginationLinkNext(nodeType: ControllerNodeType, constraints: NodeCollectionConstraints) {
    const modifiedConstraints = Object.assign({}, constraints)
    modifiedConstraints.page = (constraints.page || 1) + 1

    return buildGetCollectionUrl(nodeType, modifiedConstraints)
}
