import type {RelType} from "./RelType"
import type {ModelNode} from "../../types/ModelNode"

export type Rel = {
    id: number
    type: RelType
    origin: ModelNode
    destination: ModelNode
    created_at: string
    updated_at: string
}
