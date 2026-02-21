import {RelComposition} from "../../../relationships/types/RelComposition"
import {RelType} from "../../../relationships/types/RelType"
import {ModelNodeType} from "../../../types/ModelNodeType"

export const GamingPlatformRelComposition: RelComposition[] = [
    [RelType.GamingPlatformFeaturesRacingGame, {
        startNodeType: ModelNodeType.GamingPlatform,
        endNodeType: ModelNodeType.RacingGame,
        isReverseRelationship: false,
    }],
    [RelType.GamingPlatformHasImage, {
        startNodeType: ModelNodeType.GamingPlatform,
        endNodeType: ModelNodeType.Image,
        isReverseRelationship: false,
    }],
    [RelType.GamingPlatformHasPrimeImage, {
        startNodeType: ModelNodeType.GamingPlatform,
        endNodeType: ModelNodeType.Image,
        isReverseRelationship: false,
    }],
]
