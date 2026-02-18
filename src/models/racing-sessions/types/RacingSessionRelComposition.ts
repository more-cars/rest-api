import {RelType} from "../../relationships/types/RelType"
import {NodeType} from "../../types/NodeType"
import {RelComposition} from "../../relationships/types/RelComposition"

export const RacingSessionRelComposition: RelComposition[] = [
    [RelType.RacingSessionBelongsToRacingEvent, {
        startNodeType: NodeType.RACING_SESSION,
        endNodeType: NodeType.RACING_EVENT,
        isReverseRelationship: true,
    }],
    [RelType.RacingSessionHasSessionResult, {
        startNodeType: NodeType.RACING_SESSION,
        endNodeType: NodeType.SESSION_RESULT,
        isReverseRelationship: false,
    }],
    [RelType.RacingSessionHasImage, {
        startNodeType: NodeType.RACING_SESSION,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
    [RelType.RacingSessionHasPrimeImage, {
        startNodeType: NodeType.RACING_SESSION,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
]
