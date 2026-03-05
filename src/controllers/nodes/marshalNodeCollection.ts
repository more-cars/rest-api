import type {ControllerNode} from "../types/ControllerNode"
import type {NodeCollectionResponse} from "../types/NodeCollectionResponse"
import {marshalSingleNode} from "./marshalSingleNode"

export function marshalNodeCollection(nodes: ControllerNode[], meta: { total: number } = {total: 0}) {
    const response: NodeCollectionResponse = {
        data: [],
        meta: {
            total: meta.total,
        },
    }

    nodes.forEach((node) => {
        response.data.push(marshalSingleNode(node))
    })

    return response
}
