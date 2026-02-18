import {RelType} from "../../relationships/types/RelType"
import {NodeType} from "../../types/NodeType"
import {RelComposition} from "../../relationships/types/RelComposition"

export const ImageRelComposition: RelComposition[] = [
    [RelType.ImageBelongsToNode, {
        startNodeType: NodeType.IMAGE,
        endNodeType: NodeType.NODE,
        isReverseRelationship: true,
    }],
    [RelType.ImageIsPrimeImageOfNode, {
        startNodeType: NodeType.IMAGE,
        endNodeType: NodeType.NODE,
        isReverseRelationship: false,
    }],
]
