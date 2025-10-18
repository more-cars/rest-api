import type {BaseNode} from "../../../controllers/nodes/types/BaseNode"

export type GenericRelation = {
    id: number
    type: string
    origin: BaseNode
    destination: BaseNode
    created_at: string
    updated_at: string
}
