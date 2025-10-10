import type {NodeCollectionResponse} from "./types/NodeCollectionResponse"
import type {BaseNode} from "./types/BaseNode"
import {marshalSingleNode} from "./marshalSingleNode"

export function marshalNodeCollection(nodes: BaseNode[]) {
    const response: NodeCollectionResponse = {
        data: []
    }

    nodes.forEach((node) => {
        response.data.push(marshalSingleNode(node))
    })

    return response
}
