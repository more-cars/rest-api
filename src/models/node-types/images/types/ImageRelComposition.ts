import {RelComposition} from "../../../relationships/types/RelComposition"
import {RelType} from "../../../relationships/types/RelType"
import {ModelNodeType} from "../../../types/ModelNodeType"

export const ImageRelComposition: RelComposition[] = [
    [RelType.ImageBelongsToNode, {
        startNodeType: ModelNodeType.Image,
        endNodeType: ModelNodeType.Node,
        isReverseRelationship: true,
    }],
    [RelType.ImageIsPrimeImageOfNode, {
        startNodeType: ModelNodeType.Image,
        endNodeType: ModelNodeType.Node,
        isReverseRelationship: false,
    }],
]
