import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {NodeType} from "../NodeType"

export const RacingSessionRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.RacingSessionBelongsToRacingEvent, {
        startNodeType: NodeType.RacingSession,
        endNodeType: NodeType.RacingEvent,
        isReverseRelationship: true,
    }],
    [RelationshipType.RacingSessionHasSessionResult, {
        startNodeType: NodeType.RacingSession,
        endNodeType: NodeType.SessionResult,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingSessionHasImage, {
        startNodeType: NodeType.RacingSession,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingSessionHasPrimeImage, {
        startNodeType: NodeType.RacingSession,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
]
