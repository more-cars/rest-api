import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {DbRelationship} from "../../../types/DbRelationship"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const RacingSessionRelationshipSpecification: RelationshipSpecification[] = [
    [DbRelationship.RacingSessionBelongsToRacingEvent, {
        startNodeLabel: NodeTypeLabel.RacingSession,
        endNodeLabel: NodeTypeLabel.RacingEvent,
        relationshipName: RelationshipTypeNeo4j.RacingSessionBelongsToRacingEvent,
        isReverseRelationship: true,
    }],
    [DbRelationship.RacingSessionHasSessionResult, {
        startNodeLabel: NodeTypeLabel.RacingSession,
        endNodeLabel: NodeTypeLabel.SessionResult,
        relationshipName: RelationshipTypeNeo4j.RacingSessionHasSessionResult,
        isReverseRelationship: false,
    }],
    [DbRelationship.RacingSessionHasImage, {
        startNodeLabel: NodeTypeLabel.RacingSession,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.RacingSessionHasImage,
        isReverseRelationship: false,
    }],
    [DbRelationship.RacingSessionHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.RacingSession,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.RacingSessionHasPrimeImage,
        isReverseRelationship: false,
    }],
]
