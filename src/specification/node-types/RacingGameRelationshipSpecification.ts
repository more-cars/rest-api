import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {NodeType} from "../NodeType"

export const RacingGameRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.RacingGameFeaturesCarModelVariant, {
        startNodeType: NodeType.RacingGame,
        endNodeType: NodeType.CarModelVariant,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingGameFeaturesTrackLayout, {
        startNodeType: NodeType.RacingGame,
        endNodeType: NodeType.TrackLayout,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingGameReleasedOnGamingPlatform, {
        startNodeType: NodeType.RacingGame,
        endNodeType: NodeType.GamingPlatform,
        isReverseRelationship: true,
    }],
    [RelationshipType.RacingGameHasImage, {
        startNodeType: NodeType.RacingGame,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingGameHasPrimeImage, {
        startNodeType: NodeType.RacingGame,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
]
