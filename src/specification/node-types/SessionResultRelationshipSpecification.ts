import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {NodeType} from "../NodeType"

export const SessionResultRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.SessionResultBelongsToRacingSession, {
        startNodeType: NodeType.SessionResult,
        endNodeType: NodeType.RacingSession,
        isReverseRelationship: true,
    }],
    [RelationshipType.SessionResultHasLapTime, {
        startNodeType: NodeType.SessionResult,
        endNodeType: NodeType.LapTime,
        isReverseRelationship: false,
    }],
    [RelationshipType.SessionResultAchievedWithCarModelVariant, {
        startNodeType: NodeType.SessionResult,
        endNodeType: NodeType.CarModelVariant,
        isReverseRelationship: true,
    }],
    [RelationshipType.SessionResultHasImage, {
        startNodeType: NodeType.SessionResult,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.SessionResultHasPrimeImage, {
        startNodeType: NodeType.SessionResult,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
]
