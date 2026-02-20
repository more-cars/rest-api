import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {Neo4jNodeType} from "../../../types/Neo4jNodeType"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const ImageRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.ImageBelongsToNode, {
        startNodeLabel: Neo4jNodeType.Image,
        endNodeLabel: Neo4jNodeType.Node,
        relationshipName: RelationshipTypeNeo4j.ImageBelongsToNode,
        isReverseRelationship: true,
    }],
    [RelationshipType.ImageIsPrimeImageOfNode, {
        startNodeLabel: Neo4jNodeType.Image,
        endNodeLabel: Neo4jNodeType.Node,
        relationshipName: RelationshipTypeNeo4j.ImageIsPrimeImageOfNode,
        isReverseRelationship: true,
    }],
]
