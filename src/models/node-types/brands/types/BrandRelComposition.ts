import {RelComposition} from "../../../relationships/types/RelComposition"
import {RelType} from "../../../relationships/types/RelType"
import {ModelNodeType} from "../../../types/ModelNodeType"

export const BrandRelComposition: RelComposition[] = [
    [RelType.BrandBelongsToCompany, {
        startNodeType: ModelNodeType.Brand,
        endNodeType: ModelNodeType.Company,
        isReverseRelationship: true,
    }],
    [RelType.BrandHasCarModel, {
        startNodeType: ModelNodeType.Brand,
        endNodeType: ModelNodeType.CarModel,
        isReverseRelationship: false,
    }],
    [RelType.BrandHasImage, {
        startNodeType: ModelNodeType.Brand,
        endNodeType: ModelNodeType.Image,
        isReverseRelationship: false,
    }],
    [RelType.BrandHasPrimeImage, {
        startNodeType: ModelNodeType.Brand,
        endNodeType: ModelNodeType.Image,
        isReverseRelationship: false,
    }],
]
