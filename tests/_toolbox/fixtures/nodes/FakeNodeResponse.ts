import type {NodeType} from "../../NodeType"
import type {NodeResponse} from "../../../../src/controllers/nodes/types/NodeResponse"
import {FakeNode} from "./FakeNode"

export function FakeNodeResponse(nodeType: NodeType) {
    const node = FakeNode(nodeType)

    node.id = Math.floor((Math.random() * 1_000_000) + 12_000_000)
    node.created_at = '2023-10-01T00:00:00.001Z'
    node.updated_at = "2023-10-01T00:00:00.001Z"

    return {
        data: node
    } as NodeResponse
}
