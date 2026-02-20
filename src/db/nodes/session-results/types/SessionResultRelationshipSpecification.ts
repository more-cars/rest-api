import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {Neo4jNodeType} from "../../../types/Neo4jNodeType"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const SessionResultRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.SessionResultBelongsToRacingSession, {
        startNodeLabel: Neo4jNodeType.SessionResult,
        endNodeLabel: Neo4jNodeType.RacingSession,
        relationshipName: RelationshipTypeNeo4j.SessionResultBelongsToRacingSession,
        isReverseRelationship: true,
    }],
    [RelationshipType.SessionResultHasLapTime, {
        startNodeLabel: Neo4jNodeType.SessionResult,
        endNodeLabel: Neo4jNodeType.LapTime,
        relationshipName: RelationshipTypeNeo4j.SessionResultHasLapTime,
        isReverseRelationship: false,
    }],
    [RelationshipType.SessionResultAchievedWithCarModelVariant, {
        startNodeLabel: Neo4jNodeType.SessionResult,
        endNodeLabel: Neo4jNodeType.CarModelVariant,
        relationshipName: RelationshipTypeNeo4j.SessionResultAchievedWithCarModelVariant,
        isReverseRelationship: true,
    }],
    [RelationshipType.SessionResultHasImage, {
        startNodeLabel: Neo4jNodeType.SessionResult,
        endNodeLabel: Neo4jNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.SessionResultHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.SessionResultHasPrimeImage, {
        startNodeLabel: Neo4jNodeType.SessionResult,
        endNodeLabel: Neo4jNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.SessionResultHasPrimeImage,
        isReverseRelationship: false,
    }],
]
