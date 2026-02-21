import {RelComposition} from "../../../relationships/types/RelComposition"
import {RelType} from "../../../relationships/types/RelType"
import {ModelNodeType} from "../../../types/ModelNodeType"

export const CompanyRelComposition: RelComposition[] = [
    [RelType.CompanyHasBrand, {
        startNodeType: ModelNodeType.Company,
        endNodeType: ModelNodeType.Brand,
        isReverseRelationship: false,
    }],
    [RelType.CompanyHasImage, {
        startNodeType: ModelNodeType.Company,
        endNodeType: ModelNodeType.Image,
        isReverseRelationship: false,
    }],
    [RelType.CompanyHasPrimeImage, {
        startNodeType: ModelNodeType.Company,
        endNodeType: ModelNodeType.Image,
        isReverseRelationship: false,
    }],
]
