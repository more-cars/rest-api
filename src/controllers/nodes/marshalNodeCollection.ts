import type {ControllerNode} from "../types/ControllerNode"
import type {NodeCollectionResponse} from "../types/NodeCollectionResponse"

export function marshalNodeCollection(nodes: ControllerNode[]
) {
    const response: NodeCollectionResponse = {
        data: []
    }

    nodes.forEach((node) => {
        response.data.push({
            data: node.fields
        })
    })

    return response
}
