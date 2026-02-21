import type {ModelNode} from "../../models/types/ModelNode"
import type {NodeCollectionResponse} from "./types/NodeCollectionResponse"
import {marshalSingleNode} from "./marshalSingleNode"

export function marshalNodeCollection(nodes: ModelNode[]) {
    const response: NodeCollectionResponse = {
        data: []
    }

    nodes.forEach((node) => {
        response.data.push(marshalSingleNode(node))
    })

    return response
}
