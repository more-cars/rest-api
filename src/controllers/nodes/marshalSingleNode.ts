import type {ControllerNode} from "../types/ControllerNode"
import type {NodeResponse} from "../types/NodeResponse"

export function marshalSingleNode(node: ControllerNode) {
    const {id, ...attributes} = node.fields

    return {
        type: node.node_type,
        id,
        attributes,
    } as NodeResponse
}
