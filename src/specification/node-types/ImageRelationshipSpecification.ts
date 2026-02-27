import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {NodeType} from "../NodeType"

export const ImageRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.ImageBelongsToNode, {
        startNodeType: NodeType.Image,
        endNodeType: NodeType.Node,
        isReverseRelationship: true,
    }],
    [RelationshipType.ImageIsPrimeImageOfNode, {
        startNodeType: NodeType.Image,
        endNodeType: NodeType.Node,
        isReverseRelationship: true,
    }],
    [RelationshipType.NodeHasImage, {
        startNodeType: NodeType.Node,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.NodeHasPrimeImage, {
        startNodeType: NodeType.Node,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
]
