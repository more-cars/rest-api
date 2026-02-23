import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {DbNodeType} from "../../../types/DbNodeType"

export const ImageRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.ImageBelongsToNode, {
        startNodeType: DbNodeType.Image,
        endNodeType: DbNodeType.Node,
        isReverseRelationship: true,
    }],
    [RelationshipType.ImageIsPrimeImageOfNode, {
        startNodeType: DbNodeType.Image,
        endNodeType: DbNodeType.Node,
        isReverseRelationship: true,
    }],
    [RelationshipType.NodeHasImage, {
        startNodeType: DbNodeType.Node,
        endNodeType: DbNodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.NodeHasPrimeImage, {
        startNodeType: DbNodeType.Node,
        endNodeType: DbNodeType.Image,
        isReverseRelationship: false,
    }],
]
