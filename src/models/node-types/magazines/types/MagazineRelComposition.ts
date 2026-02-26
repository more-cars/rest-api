import {RelComposition} from "../../../relationships/types/RelComposition"
import {RelType} from "../../../relationships/types/RelType"
import {ModelNodeType} from "../../../types/ModelNodeType"

export const MagazineRelComposition: RelComposition[] = [
    [RelType.MagazineHasImage, {
        startNodeType: ModelNodeType.Magazine,
        endNodeType: ModelNodeType.Image,
        isReverseRelationship: false,
    }],
]
