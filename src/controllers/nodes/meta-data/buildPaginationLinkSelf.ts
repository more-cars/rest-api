import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import {ControllerNodeType} from "../../types/ControllerNodeType"
import {buildGetCollectionUrl} from "./buildGetCollectionUrl"

export function buildPaginationLinkSelf(nodeType: ControllerNodeType, constraints: NodeCollectionConstraints) {
    constraints.page = constraints.page || 1

    return buildGetCollectionUrl(nodeType, constraints)
}
