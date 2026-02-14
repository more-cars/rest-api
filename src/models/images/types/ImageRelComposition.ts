import {RelationshipType} from "../../relationships/types/RelationshipType"
import {NodeType} from "../../types/NodeType"
import {RelComposition} from "../../relationships/types/RelComposition"

export const ImageRelComposition: RelComposition[] = [
    [RelationshipType.ImageBelongsToNode, {
        startNodeType: NodeType.IMAGE,
        endNodeType: NodeType.NODE,
        isReverseRelationship: true,
    }],
    [RelationshipType.ImageIsPrimeImageOfNode, {
        startNodeType: NodeType.IMAGE,
        endNodeType: NodeType.NODE,
        isReverseRelationship: false,
    }],
]
