import {RelType} from "../../relationships/types/RelType"
import {NodeType} from "../../types/NodeType"
import {RelComposition} from "../../relationships/types/RelComposition"

export const GamingPlatformRelComposition: RelComposition[] = [
    [RelType.GamingPlatformFeaturesRacingGame, {
        startNodeType: NodeType.GAMING_PLATFORM,
        endNodeType: NodeType.RACING_GAME,
        isReverseRelationship: false,
    }],
    [RelType.GamingPlatformHasImage, {
        startNodeType: NodeType.GAMING_PLATFORM,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
    [RelType.GamingPlatformHasPrimeImage, {
        startNodeType: NodeType.GAMING_PLATFORM,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
]
