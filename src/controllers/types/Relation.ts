import {RelationType} from "./RelationType"
import type {ControllerNode} from "./ControllerNode"

export type Relation = {
    id: number
    type: RelationType
    from_node: ControllerNode
    to_node: ControllerNode
    created_at: string
    updated_at: string
}
