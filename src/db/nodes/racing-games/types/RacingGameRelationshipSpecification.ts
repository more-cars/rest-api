import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {DbNodeType} from "../../../types/DbNodeType"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const RacingGameRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.RacingGameFeaturesCarModelVariant, {
        startNodeType: DbNodeType.RacingGame,
        endNodeType: DbNodeType.CarModelVariant,
        relationshipName: RelationshipTypeNeo4j.RacingGameFeaturesCarModelVariant,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingGameFeaturesTrackLayout, {
        startNodeType: DbNodeType.RacingGame,
        endNodeType: DbNodeType.TrackLayout,
        relationshipName: RelationshipTypeNeo4j.RacingGameFeaturesTrackLayout,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingGameReleasedOnGamingPlatform, {
        startNodeType: DbNodeType.RacingGame,
        endNodeType: DbNodeType.GamingPlatform,
        relationshipName: RelationshipTypeNeo4j.RacingGameReleasedOnGamingPlatform,
        isReverseRelationship: true,
    }],
    [RelationshipType.RacingGameHasImage, {
        startNodeType: DbNodeType.RacingGame,
        endNodeType: DbNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.RacingGameHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingGameHasPrimeImage, {
        startNodeType: DbNodeType.RacingGame,
        endNodeType: DbNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.RacingGameHasPrimeImage,
        isReverseRelationship: false,
    }],
]
