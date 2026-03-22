import type {ControllerNode} from "../types/ControllerNode"
import type {NodeResponse} from "../types/NodeResponse"

export function marshalSingleNode(node: ControllerNode) {
    const {id, ...attributes} = node.fields

    const marshalledData: NodeResponse = {
        type: node.node_type,
        id,
        attributes,
        links: {
            self: `/${node.node_type}/${node.fields.id}`,
        },
    }

    return marshalledData
}
