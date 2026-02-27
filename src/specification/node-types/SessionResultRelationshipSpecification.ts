import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {DbNodeType} from "../../db/types/DbNodeType"

export const SessionResultRelationshipSpecification: RelationshipTypeSpecification[] = [
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
