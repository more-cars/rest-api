import {RelComposition} from "../../../relationships/types/RelComposition"
import {RelType} from "../../../relationships/types/RelType"
import {ModelNodeType} from "../../../types/ModelNodeType"

export const CarModelVariantRelComposition: RelComposition[] = [
    [RelType.CarModelVariantIsVariantOf, {
        startNodeType: ModelNodeType.CarModelVariant,
        endNodeType: ModelNodeType.CarModel,
        isReverseRelationship: true,
    }],
    [RelType.CarModelVariantAchievedSessionResult, {
        startNodeType: ModelNodeType.CarModelVariant,
        endNodeType: ModelNodeType.SessionResult,
        isReverseRelationship: false,
    }],
    [RelType.CarModelVariantAchievedLapTime, {
        startNodeType: ModelNodeType.CarModelVariant,
        endNodeType: ModelNodeType.LapTime,
        isReverseRelationship: false,
    }],
    [RelType.CarModelVariantIsFeaturedInRacingGame, {
        startNodeType: ModelNodeType.CarModelVariant,
        endNodeType: ModelNodeType.RacingGame,
        isReverseRelationship: true,
    }],
    [RelType.CarModelVariantHasImage, {
        startNodeType: ModelNodeType.CarModelVariant,
        endNodeType: ModelNodeType.Image,
        isReverseRelationship: false,
    }],
    [RelType.CarModelVariantHasPrimeImage, {
        startNodeType: ModelNodeType.CarModelVariant,
        endNodeType: ModelNodeType.Image,
        isReverseRelationship: false,
    }],
]
