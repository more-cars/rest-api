import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {DbRelationship} from "../../../types/DbRelationship"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const SessionResultRelationshipSpecification: RelationshipSpecification[] = [
    [DbRelationship.SessionResultBelongsToRacingSession, {
        startNodeLabel: NodeTypeLabel.SessionResult,
        endNodeLabel: NodeTypeLabel.RacingSession,
        relationshipName: RelationshipTypeNeo4j.SessionResultBelongsToRacingSession,
        isReverseRelationship: true,
    }],
    [DbRelationship.SessionResultHasLapTime, {
        startNodeLabel: NodeTypeLabel.SessionResult,
        endNodeLabel: NodeTypeLabel.LapTime,
        relationshipName: RelationshipTypeNeo4j.SessionResultHasLapTime,
        isReverseRelationship: false,
    }],
    [DbRelationship.SessionResultAchievedWithCarModelVariant, {
        startNodeLabel: NodeTypeLabel.SessionResult,
        endNodeLabel: NodeTypeLabel.CarModelVariant,
        relationshipName: RelationshipTypeNeo4j.SessionResultAchievedWithCarModelVariant,
        isReverseRelationship: true,
    }],
    [DbRelationship.SessionResultHasImage, {
        startNodeLabel: NodeTypeLabel.SessionResult,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.SessionResultHasImage,
        isReverseRelationship: false,
    }],
    [DbRelationship.SessionResultHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.SessionResult,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.SessionResultHasPrimeImage,
        isReverseRelationship: false,
    }],
]
