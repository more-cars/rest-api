import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {DbNodeType} from "../../../types/DbNodeType"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const SessionResultRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.SessionResultBelongsToRacingSession, {
        startNodeType: DbNodeType.SessionResult,
        endNodeType: DbNodeType.RacingSession,
        relationshipName: RelationshipTypeNeo4j.SessionResultBelongsToRacingSession,
        isReverseRelationship: true,
    }],
    [RelationshipType.SessionResultHasLapTime, {
        startNodeType: DbNodeType.SessionResult,
        endNodeType: DbNodeType.LapTime,
        relationshipName: RelationshipTypeNeo4j.SessionResultHasLapTime,
        isReverseRelationship: false,
    }],
    [RelationshipType.SessionResultAchievedWithCarModelVariant, {
        startNodeType: DbNodeType.SessionResult,
        endNodeType: DbNodeType.CarModelVariant,
        relationshipName: RelationshipTypeNeo4j.SessionResultAchievedWithCarModelVariant,
        isReverseRelationship: true,
    }],
    [RelationshipType.SessionResultHasImage, {
        startNodeType: DbNodeType.SessionResult,
        endNodeType: DbNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.SessionResultHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.SessionResultHasPrimeImage, {
        startNodeType: DbNodeType.SessionResult,
        endNodeType: DbNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.SessionResultHasPrimeImage,
        isReverseRelationship: false,
    }],
]
