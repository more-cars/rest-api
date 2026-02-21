import {RelComposition} from "../../../relationships/types/RelComposition"
import {RelType} from "../../../relationships/types/RelType"
import {ModelNodeType} from "../../../types/ModelNodeType"

export const RacingGameRelComposition: RelComposition[] = [
    [RelType.RacingGameFeaturesCarModelVariant, {
        startNodeType: ModelNodeType.RacingGame,
        endNodeType: ModelNodeType.CarModelVariant,
        isReverseRelationship: false,
    }],
    [RelType.RacingGameFeaturesTrackLayout, {
        startNodeType: ModelNodeType.RacingGame,
        endNodeType: ModelNodeType.TrackLayout,
        isReverseRelationship: false,
    }],
    [RelType.RacingGameReleasedOnGamingPlatform, {
        startNodeType: ModelNodeType.RacingGame,
        endNodeType: ModelNodeType.GamingPlatform,
        isReverseRelationship: true,
    }],
    [RelType.RacingGameHasImage, {
        startNodeType: ModelNodeType.RacingGame,
        endNodeType: ModelNodeType.Image,
        isReverseRelationship: false,
    }],
    [RelType.RacingGameHasPrimeImage, {
        startNodeType: ModelNodeType.RacingGame,
        endNodeType: ModelNodeType.Image,
        isReverseRelationship: false,
    }],
]
