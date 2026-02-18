import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const RacingSessionRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.RacingSessionBelongsToRacingEvent, {
        startNodeLabel: NodeTypeLabel.RacingSession,
        endNodeLabel: NodeTypeLabel.RacingEvent,
        relationshipName: RelationshipTypeNeo4j.RacingSessionBelongsToRacingEvent,
        isReverseRelationship: true,
    }],
    [RelationshipType.RacingSessionHasSessionResult, {
        startNodeLabel: NodeTypeLabel.RacingSession,
        endNodeLabel: NodeTypeLabel.SessionResult,
        relationshipName: RelationshipTypeNeo4j.RacingSessionHasSessionResult,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingSessionHasImage, {
        startNodeLabel: NodeTypeLabel.RacingSession,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.RacingSessionHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingSessionHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.RacingSession,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.RacingSessionHasPrimeImage,
        isReverseRelationship: false,
    }],
]
