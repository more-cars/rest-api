import {RelationshipType} from "../../relationships/types/RelationshipType"
import {NodeType} from "../../types/NodeType"
import {RelComposition} from "../../relationships/types/RelComposition"

export const RacingSessionRelComposition: RelComposition[] = [
    [RelationshipType.RacingSessionBelongsToRacingEvent, {
        startNodeType: NodeType.RACING_SESSION,
        endNodeType: NodeType.RACING_EVENT,
        isReverseRelationship: true,
    }],
    [RelationshipType.RacingSessionHasSessionResult, {
        startNodeType: NodeType.RACING_SESSION,
        endNodeType: NodeType.SESSION_RESULT,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingSessionHasImage, {
        startNodeType: NodeType.RACING_SESSION,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingSessionHasPrimeImage, {
        startNodeType: NodeType.RACING_SESSION,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
]
