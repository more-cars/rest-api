import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {DbNodeType} from "../../../types/DbNodeType"

export const SessionResultRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.SessionResultBelongsToRacingSession, {
        startNodeType: DbNodeType.SessionResult,
        endNodeType: DbNodeType.RacingSession,
        isReverseRelationship: true,
    }],
    [RelationshipType.SessionResultHasLapTime, {
        startNodeType: DbNodeType.SessionResult,
        endNodeType: DbNodeType.LapTime,
        isReverseRelationship: false,
    }],
    [RelationshipType.SessionResultAchievedWithCarModelVariant, {
        startNodeType: DbNodeType.SessionResult,
        endNodeType: DbNodeType.CarModelVariant,
        isReverseRelationship: true,
    }],
    [RelationshipType.SessionResultHasImage, {
        startNodeType: DbNodeType.SessionResult,
        endNodeType: DbNodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.SessionResultHasPrimeImage, {
        startNodeType: DbNodeType.SessionResult,
        endNodeType: DbNodeType.Image,
        isReverseRelationship: false,
    }],
]
