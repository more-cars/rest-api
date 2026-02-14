import {RelationshipType} from "../../relationships/types/RelationshipType"
import {NodeType} from "../../types/NodeType"
import {RelComposition} from "../../relationships/types/RelComposition"

export const RacingGameRelComposition: RelComposition[] = [
    [RelationshipType.RacingGameFeaturesCarModelVariant, {
        startNodeType: NodeType.RACING_GAME,
        endNodeType: NodeType.CAR_MODEL_VARIANT,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingGameFeaturesTrackLayout, {
        startNodeType: NodeType.RACING_GAME,
        endNodeType: NodeType.TRACK_LAYOUT,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingGameReleasedOnGamingPlatform, {
        startNodeType: NodeType.RACING_GAME,
        endNodeType: NodeType.GAMING_PLATFORM,
        isReverseRelationship: true,
    }],
    [RelationshipType.RacingGameHasImage, {
        startNodeType: NodeType.RACING_GAME,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingGameHasPrimeImage, {
        startNodeType: NodeType.RACING_GAME,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
]
