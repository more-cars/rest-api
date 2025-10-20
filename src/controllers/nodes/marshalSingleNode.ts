import type {NodeResponse} from "./types/NodeResponse"

// TODO return only those fields that are defined in the API spec
export function marshalSingleNode(node: object) {
    if (node && 'mc_id' in node) {
        delete node.mc_id
    }

    return {
        data: node,
    } as NodeResponse
}
