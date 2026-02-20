import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {DbNodeType} from "../../../types/DbNodeType"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const ImageRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.ImageBelongsToNode, {
        startNodeType: DbNodeType.Image,
        endNodeType: DbNodeType.Node,
        relationshipName: RelationshipTypeNeo4j.ImageBelongsToNode,
        isReverseRelationship: true,
    }],
    [RelationshipType.ImageIsPrimeImageOfNode, {
        startNodeType: DbNodeType.Image,
        endNodeType: DbNodeType.Node,
        relationshipName: RelationshipTypeNeo4j.ImageIsPrimeImageOfNode,
        isReverseRelationship: true,
    }],
]
