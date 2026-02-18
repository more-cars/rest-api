import {RelType} from "../../relationships/types/RelType"
import {NodeType} from "../../types/NodeType"
import {RelComposition} from "../../relationships/types/RelComposition"

export const SessionResultRelComposition: RelComposition[] = [
    [RelType.SessionResultBelongsToRacingSession, {
        startNodeType: NodeType.SESSION_RESULT,
        endNodeType: NodeType.RACING_SESSION,
        isReverseRelationship: true,
    }],
    [RelType.SessionResultHasLapTime, {
        startNodeType: NodeType.SESSION_RESULT,
        endNodeType: NodeType.LAP_TIME,
        isReverseRelationship: false,
    }],
    [RelType.SessionResultAchievedWithCarModelVariant, {
        startNodeType: NodeType.SESSION_RESULT,
        endNodeType: NodeType.CAR_MODEL_VARIANT,
        isReverseRelationship: true,
    }],
    [RelType.SessionResultHasImage, {
        startNodeType: NodeType.SESSION_RESULT,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
    [RelType.SessionResultHasPrimeImage, {
        startNodeType: NodeType.SESSION_RESULT,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
]
