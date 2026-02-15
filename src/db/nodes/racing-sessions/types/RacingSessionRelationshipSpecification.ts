import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {DbRelationship} from "../../../types/DbRelationship"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {DbRelationshipName} from "../../../types/DbRelationshipName"

export const RacingSessionRelationshipSpecification: RelationshipSpecification[] = [
    [DbRelationship.RacingSessionBelongsToRacingEvent, {
        startNodeLabel: NodeTypeLabel.RacingSession,
        endNodeLabel: NodeTypeLabel.RacingEvent,
        relationshipName: DbRelationshipName.RacingSessionBelongsToRacingEvent,
        isReverseRelationship: true,
    }],
    [DbRelationship.RacingSessionHasSessionResult, {
        startNodeLabel: NodeTypeLabel.RacingSession,
        endNodeLabel: NodeTypeLabel.SessionResult,
        relationshipName: DbRelationshipName.RacingSessionHasSessionResult,
        isReverseRelationship: false,
    }],
    [DbRelationship.RacingSessionHasImage, {
        startNodeLabel: NodeTypeLabel.RacingSession,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: DbRelationshipName.RacingSessionHasImage,
        isReverseRelationship: false,
    }],
    [DbRelationship.RacingSessionHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.RacingSession,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: DbRelationshipName.RacingSessionHasPrimeImage,
        isReverseRelationship: false,
    }],
]
