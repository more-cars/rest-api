import type {ControllerNode} from "../types/ControllerNode"
import type {MetaData} from "../types/MetaData"
import type {NodeCollectionResponse} from "../types/NodeCollectionResponse"
import {marshalSingleNode} from "./marshalSingleNode"

export function marshalNodeCollection(nodes: ControllerNode[], meta: MetaData) {
    const currentPage = meta.current_page || 1
    const pageSize = meta.page_size || 100
    const totalNodes = meta.total || 0
    const totalPages = Math.floor((totalNodes / pageSize) + 1)

    const response: NodeCollectionResponse = {
        data: [],
        meta: {
            page: {
                current: currentPage,
                size: pageSize,
                total_nodes: totalNodes,
                total_pages: totalPages,
            },
        },
    }

    nodes.forEach((node) => {
        response.data.push(marshalSingleNode(node))
    })

    return response
}
