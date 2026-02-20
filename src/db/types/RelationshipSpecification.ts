import {RelationshipType} from "./RelationshipType"
import {DbNodeType} from "./DbNodeType"
import {RelationshipTypeNeo4j} from "./RelationshipTypeNeo4j"

export type RelationshipSpecification = [
    RelationshipType, {
        startNodeType: DbNodeType
        endNodeType: DbNodeType
        relationshipName: RelationshipTypeNeo4j
        isReverseRelationship: boolean
    }
]
