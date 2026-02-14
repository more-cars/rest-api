import {RelationshipType} from "../../relationships/types/RelationshipType"
import {NodeType} from "../../types/NodeType"
import {RelComposition} from "../../relationships/types/RelComposition"

export const SessionResultRelComposition: RelComposition[] = [
    [RelationshipType.SessionResultBelongsToRacingSession, {
        startNodeType: NodeType.SESSION_RESULT,
        endNodeType: NodeType.RACING_SESSION,
        isReverseRelationship: true,
    }],
    [RelationshipType.SessionResultHasLapTime, {
        startNodeType: NodeType.SESSION_RESULT,
        endNodeType: NodeType.LAP_TIME,
        isReverseRelationship: false,
    }],
    [RelationshipType.SessionResultAchievedWithCarModelVariant, {
        startNodeType: NodeType.SESSION_RESULT,
        endNodeType: NodeType.CAR_MODEL_VARIANT,
        isReverseRelationship: true,
    }],
    [RelationshipType.SessionResultHasImage, {
        startNodeType: NodeType.SESSION_RESULT,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
    [RelationshipType.SessionResultHasPrimeImage, {
        startNodeType: NodeType.SESSION_RESULT,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
]
