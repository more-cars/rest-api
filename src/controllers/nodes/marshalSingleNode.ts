import type {NodeResponse} from "../types/NodeResponse"

export function marshalSingleNode(node: object) {
    return {
        data: node,
    } as NodeResponse
}
