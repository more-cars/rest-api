import type {NodeCollectionResponse} from "./types/NodeCollectionResponse"
import type {ControllerNode} from "./types/ControllerNode"
import {marshalSingleNode} from "./marshalSingleNode"

export function marshalNodeCollection(nodes: ControllerNode[]) {
    const response: NodeCollectionResponse = {
        data: []
    }

    nodes.forEach((node) => {
        response.data.push(marshalSingleNode(node))
    })

    return response
}
