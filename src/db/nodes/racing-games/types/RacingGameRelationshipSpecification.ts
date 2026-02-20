import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {DbNodeType} from "../../../types/DbNodeType"

export const RacingGameRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.RacingGameFeaturesCarModelVariant, {
        startNodeType: DbNodeType.RacingGame,
        endNodeType: DbNodeType.CarModelVariant,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingGameFeaturesTrackLayout, {
        startNodeType: DbNodeType.RacingGame,
        endNodeType: DbNodeType.TrackLayout,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingGameReleasedOnGamingPlatform, {
        startNodeType: DbNodeType.RacingGame,
        endNodeType: DbNodeType.GamingPlatform,
        isReverseRelationship: true,
    }],
    [RelationshipType.RacingGameHasImage, {
        startNodeType: DbNodeType.RacingGame,
        endNodeType: DbNodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingGameHasPrimeImage, {
        startNodeType: DbNodeType.RacingGame,
        endNodeType: DbNodeType.Image,
        isReverseRelationship: false,
    }],
]
