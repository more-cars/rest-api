import type {RelationshipType} from "./RelationshipType"
import {BaseNode} from "../../../db/types/BaseNode"

export type GenericRelation = {
    id: number
    type: RelationshipType
    origin: BaseNode
    destination: BaseNode
    created_at: string
    updated_at: string
}
