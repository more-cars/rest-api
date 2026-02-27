import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../../db/types/RelationshipType"
import {DbNodeType} from "../../db/types/DbNodeType"

export const ImageRelationshipSpecification: RelationshipTypeSpecification[] = [
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
