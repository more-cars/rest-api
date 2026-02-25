import {RelationType} from "./RelationType"
import type {ControllerNode} from "./ControllerNode"

export type Relation = {
    id: number
    type: RelationType
    partner_node: ControllerNode
    created_at: string
    updated_at: string
}
