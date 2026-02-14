import {RelationshipType} from "../../relationships/types/RelationshipType"
import {NodeType} from "../../types/NodeType"
import {RelComposition} from "../../relationships/types/RelComposition"

export const GamingPlatformRelComposition: RelComposition[] = [
    [RelationshipType.GamingPlatformFeaturesRacingGame, {
        startNodeType: NodeType.GAMING_PLATFORM,
        endNodeType: NodeType.RACING_GAME,
        isReverseRelationship: false,
    }],
    [RelationshipType.GamingPlatformHasImage, {
        startNodeType: NodeType.GAMING_PLATFORM,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
    [RelationshipType.GamingPlatformHasPrimeImage, {
        startNodeType: NodeType.GAMING_PLATFORM,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
]
