import {RelType} from "../../../relationships/types/RelType"
import {NodeType} from "../../../types/NodeType"
import {RelComposition} from "../../../relationships/types/RelComposition"

export const BrandRelComposition: RelComposition[] = [
    [RelType.BrandBelongsToCompany, {
        startNodeType: NodeType.BRAND,
        endNodeType: NodeType.COMPANY,
        isReverseRelationship: true,
    }],
    [RelType.BrandHasCarModel, {
        startNodeType: NodeType.BRAND,
        endNodeType: NodeType.CAR_MODEL,
        isReverseRelationship: false,
    }],
    [RelType.BrandHasImage, {
        startNodeType: NodeType.BRAND,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
    [RelType.BrandHasPrimeImage, {
        startNodeType: NodeType.BRAND,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
]
