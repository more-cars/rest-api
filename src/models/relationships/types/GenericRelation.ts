import type {RelType} from "./RelType"
import {BaseNode} from "../../../db/types/BaseNode"

export type GenericRelation = {
    id: number
    type: RelType
    origin: BaseNode
    destination: BaseNode
    created_at: string
    updated_at: string
}
