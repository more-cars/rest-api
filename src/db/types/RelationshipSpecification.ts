import {NodeTypeLabel} from "../NodeTypeLabel"
import {DbRelationship} from "./DbRelationship"
import {RelationshipTypeNeo4j} from "./RelationshipTypeNeo4j"

export type RelationshipSpecification = [
    DbRelationship, {
        startNodeLabel: NodeTypeLabel
        endNodeLabel: NodeTypeLabel
        relationshipName: RelationshipTypeNeo4j
        isReverseRelationship: boolean
    }
]
