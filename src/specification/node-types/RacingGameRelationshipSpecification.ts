import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../../db/types/RelationshipType"
import {DbNodeType} from "../../db/types/DbNodeType"

export const RacingGameRelationshipSpecification: RelationshipTypeSpecification[] = [
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
