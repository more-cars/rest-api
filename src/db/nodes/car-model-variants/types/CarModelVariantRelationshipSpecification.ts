import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {DbNodeType} from "../../../types/DbNodeType"

export const CarModelVariantRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.CarModelVariantIsVariantOf, {
        startNodeType: DbNodeType.CarModelVariant,
        endNodeType: DbNodeType.CarModel,
        isReverseRelationship: true,
    }],
    [RelationshipType.CarModelVariantAchievedSessionResult, {
        startNodeType: DbNodeType.CarModelVariant,
        endNodeType: DbNodeType.SessionResult,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelVariantAchievedLapTime, {
        startNodeType: DbNodeType.CarModelVariant,
        endNodeType: DbNodeType.LapTime,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelVariantIsFeaturedInRacingGame, {
        startNodeType: DbNodeType.CarModelVariant,
        endNodeType: DbNodeType.RacingGame,
        isReverseRelationship: true,
    }],
    [RelationshipType.CarModelVariantHasImage, {
        startNodeType: DbNodeType.CarModelVariant,
        endNodeType: DbNodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelVariantHasPrimeImage, {
        startNodeType: DbNodeType.CarModelVariant,
        endNodeType: DbNodeType.Image,
        isReverseRelationship: false,
    }],
]
