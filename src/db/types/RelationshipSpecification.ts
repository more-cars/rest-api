import {RelationshipType} from "./RelationshipType"
import {DbNodeType} from "./DbNodeType"

export type RelationshipSpecification = [
    RelationshipType, {
        startNodeType: DbNodeType
        endNodeType: DbNodeType
        isReverseRelationship: boolean
    }
]
