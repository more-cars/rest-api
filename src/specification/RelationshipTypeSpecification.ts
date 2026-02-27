import type {RelationshipType} from "./RelationshipType"
import {DbNodeType} from "../db/types/DbNodeType"

export type RelationshipTypeSpecification = [
    RelationshipType, {
        startNodeType: DbNodeType
        endNodeType: DbNodeType
        isReverseRelationship: boolean
    }
]
