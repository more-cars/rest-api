import {NodeTypeLabel} from "../NodeTypeLabel"
import {RelationshipType} from "./RelationshipType"
import {RelationshipTypeNeo4j} from "./RelationshipTypeNeo4j"

export type RelationshipSpecification = [
    RelationshipType, {
        startNodeLabel: NodeTypeLabel
        endNodeLabel: NodeTypeLabel
        relationshipName: RelationshipTypeNeo4j
        isReverseRelationship: boolean
    }
]
