import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {DbNodeType} from "../../../types/DbNodeType"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const CarModelVariantRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.CarModelVariantIsVariantOf, {
        startNodeType: DbNodeType.CarModelVariant,
        endNodeType: DbNodeType.CarModel,
        relationshipName: RelationshipTypeNeo4j.CarModelVariantIsVariantOf,
        isReverseRelationship: true,
    }],
    [RelationshipType.CarModelVariantAchievedSessionResult, {
        startNodeType: DbNodeType.CarModelVariant,
        endNodeType: DbNodeType.SessionResult,
        relationshipName: RelationshipTypeNeo4j.CarModelVariantAchievedSessionResult,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelVariantAchievedLapTime, {
        startNodeType: DbNodeType.CarModelVariant,
        endNodeType: DbNodeType.LapTime,
        relationshipName: RelationshipTypeNeo4j.CarModelVariantAchievedLapTime,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelVariantIsFeaturedInRacingGame, {
        startNodeType: DbNodeType.CarModelVariant,
        endNodeType: DbNodeType.RacingGame,
        relationshipName: RelationshipTypeNeo4j.CarModelVariantIsFeaturedInRacingGame,
        isReverseRelationship: true,
    }],
    [RelationshipType.CarModelVariantHasImage, {
        startNodeType: DbNodeType.CarModelVariant,
        endNodeType: DbNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.CarModelVariantHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelVariantHasPrimeImage, {
        startNodeType: DbNodeType.CarModelVariant,
        endNodeType: DbNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.CarModelVariantHasPrimeImage,
        isReverseRelationship: false,
    }],
]
