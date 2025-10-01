import {NodeTypeLabel} from "../../src/db/NodeTypeLabel"

export function getAllNodeTypes() {
    return Array.from(new Set(Object.values(NodeTypeLabel) as string[])) as NodeTypeLabel[]
}
