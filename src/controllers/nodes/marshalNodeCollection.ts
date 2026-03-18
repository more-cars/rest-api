import type {ControllerNode} from "../types/ControllerNode"
import type {MetaData} from "../types/MetaData"
import type {NodeCollectionResponse} from "../types/NodeCollectionResponse"
import {marshalSingleNode} from "./marshalSingleNode"

export function marshalNodeCollection(nodes: ControllerNode[], meta: MetaData) {
    const response: NodeCollectionResponse = {
        data: [],
        meta: {
            page: {
                size: meta.page_size || 100,
                total_nodes: meta.total || 0,
            },
        },
    }

    nodes.forEach((node) => {
        response.data.push(marshalSingleNode(node))
    })

    return response
}
