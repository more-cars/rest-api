import type {NodeResponse} from "./types/NodeResponse"

// TODO return only those fields that are defined in the API spec
export function marshalSingleNode(node: object) {
    // @ts-expect-error TS2339
    delete node.mc_id

    return {
        data: node,
    } as NodeResponse
}
