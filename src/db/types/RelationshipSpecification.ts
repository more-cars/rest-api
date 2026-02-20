import {Neo4jNodeType} from "./Neo4jNodeType"
import {RelationshipType} from "./RelationshipType"
import {RelationshipTypeNeo4j} from "./RelationshipTypeNeo4j"

export type RelationshipSpecification = [
    RelationshipType, {
        startNodeLabel: Neo4jNodeType
        endNodeLabel: Neo4jNodeType
        relationshipName: RelationshipTypeNeo4j
        isReverseRelationship: boolean
    }
]
