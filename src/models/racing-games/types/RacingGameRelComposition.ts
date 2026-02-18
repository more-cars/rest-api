import {RelType} from "../../relationships/types/RelType"
import {NodeType} from "../../types/NodeType"
import {RelComposition} from "../../relationships/types/RelComposition"

export const RacingGameRelComposition: RelComposition[] = [
    [RelType.RacingGameFeaturesCarModelVariant, {
        startNodeType: NodeType.RACING_GAME,
        endNodeType: NodeType.CAR_MODEL_VARIANT,
        isReverseRelationship: false,
    }],
    [RelType.RacingGameFeaturesTrackLayout, {
        startNodeType: NodeType.RACING_GAME,
        endNodeType: NodeType.TRACK_LAYOUT,
        isReverseRelationship: false,
    }],
    [RelType.RacingGameReleasedOnGamingPlatform, {
        startNodeType: NodeType.RACING_GAME,
        endNodeType: NodeType.GAMING_PLATFORM,
        isReverseRelationship: true,
    }],
    [RelType.RacingGameHasImage, {
        startNodeType: NodeType.RACING_GAME,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
    [RelType.RacingGameHasPrimeImage, {
        startNodeType: NodeType.RACING_GAME,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
]
