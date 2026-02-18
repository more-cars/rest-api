import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const SessionResultRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.SessionResultBelongsToRacingSession, {
        startNodeLabel: NodeTypeLabel.SessionResult,
        endNodeLabel: NodeTypeLabel.RacingSession,
        relationshipName: RelationshipTypeNeo4j.SessionResultBelongsToRacingSession,
        isReverseRelationship: true,
    }],
    [RelationshipType.SessionResultHasLapTime, {
        startNodeLabel: NodeTypeLabel.SessionResult,
        endNodeLabel: NodeTypeLabel.LapTime,
        relationshipName: RelationshipTypeNeo4j.SessionResultHasLapTime,
        isReverseRelationship: false,
    }],
    [RelationshipType.SessionResultAchievedWithCarModelVariant, {
        startNodeLabel: NodeTypeLabel.SessionResult,
        endNodeLabel: NodeTypeLabel.CarModelVariant,
        relationshipName: RelationshipTypeNeo4j.SessionResultAchievedWithCarModelVariant,
        isReverseRelationship: true,
    }],
    [RelationshipType.SessionResultHasImage, {
        startNodeLabel: NodeTypeLabel.SessionResult,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.SessionResultHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.SessionResultHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.SessionResult,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.SessionResultHasPrimeImage,
        isReverseRelationship: false,
    }],
]
