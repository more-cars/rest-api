import {ControllerNodeType} from "../types/ControllerNodeType"
import type {ControllerNode} from "../types/ControllerNode"
import type {NodeCollectionConstraints} from "../../models/types/NodeCollectionConstraints"
import type {NodeCollectionResponse} from "../types/NodeCollectionResponse"
import {buildPaginationLinkSelf} from "./meta-data/buildPaginationLinkSelf"
import {marshalSingleNode} from "./marshalSingleNode"
import {buildPaginationLinkFirst} from "./meta-data/buildPaginationLinkFirst"
import {buildPaginationLinkPrev} from "./meta-data/buildPaginationLinkPrev"

export function marshalNodeCollection(
    nodeType: ControllerNodeType,
    nodes: ControllerNode[],
    constraints: NodeCollectionConstraints,
    totalNodeCount: number,
) {
    const currentPage = constraints.page || 1
    const pageSize = 100
    const totalNodes = totalNodeCount || 0
    const totalPages = Math.floor((totalNodes / pageSize) + 1)
    console.log(constraints)
    const response: NodeCollectionResponse = {
        links: {
            self: buildPaginationLinkSelf(nodeType, constraints),
            first: buildPaginationLinkFirst(nodeType, constraints),
            prev: buildPaginationLinkPrev(nodeType, constraints),
        },
        meta: {
            page: {
                current: currentPage,
                size: pageSize,
                total_nodes: totalNodes,
                total_pages: totalPages,
            },
        },
        data: [],
    }

    nodes.forEach((node) => {
        response.data.push(marshalSingleNode(node))
    })

    return response
}
