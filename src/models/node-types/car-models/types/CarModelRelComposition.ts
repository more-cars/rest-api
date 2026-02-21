import {RelComposition} from "../../../relationships/types/RelComposition"
import {RelType} from "../../../relationships/types/RelType"
import {ModelNodeType} from "../../../types/ModelNodeType"

export const CarModelRelComposition: RelComposition[] = [
    [RelType.CarModelBelongsToBrand, {
        startNodeType: ModelNodeType.CarModel,
        endNodeType: ModelNodeType.Brand,
        isReverseRelationship: true,
    }],
    [RelType.CarModelHasSuccessor, {
        startNodeType: ModelNodeType.CarModel,
        endNodeType: ModelNodeType.CarModel,
        isReverseRelationship: false,
    }],
    [RelType.CarModelIsSuccessorOf, {
        startNodeType: ModelNodeType.CarModel,
        endNodeType: ModelNodeType.CarModel,
        isReverseRelationship: true,
    }],
    [RelType.CarModelHasVariant, {
        startNodeType: ModelNodeType.CarModel,
        endNodeType: ModelNodeType.CarModelVariant,
        isReverseRelationship: false,
    }],
    [RelType.CarModelHasImage, {
        startNodeType: ModelNodeType.CarModel,
        endNodeType: ModelNodeType.Image,
        isReverseRelationship: false,
    }],
    [RelType.CarModelHasPrimeImage, {
        startNodeType: ModelNodeType.CarModel,
        endNodeType: ModelNodeType.Image,
        isReverseRelationship: false,
    }],
]
