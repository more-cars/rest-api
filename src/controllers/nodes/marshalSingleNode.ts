import type {NodeResponse} from "./types/NodeResponse"

// TODO return only those fields that are defined in the API spec
export function marshalSingleNode(node: object) {
    return {
        data: node,
    } as NodeResponse
}
