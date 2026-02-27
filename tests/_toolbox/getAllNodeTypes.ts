import {NodeType} from "../../src/specification/NodeType"

export function getAllNodeTypes() {
    return Array.from(new Set(Object.values(NodeType) as string[])) as NodeType[]
}
