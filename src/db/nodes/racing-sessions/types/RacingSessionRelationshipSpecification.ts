import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {DbNodeType} from "../../../types/DbNodeType"

export const RacingSessionRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.RacingSessionBelongsToRacingEvent, {
        startNodeType: DbNodeType.RacingSession,
        endNodeType: DbNodeType.RacingEvent,
        isReverseRelationship: true,
    }],
    [RelationshipType.RacingSessionHasSessionResult, {
        startNodeType: DbNodeType.RacingSession,
        endNodeType: DbNodeType.SessionResult,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingSessionHasImage, {
        startNodeType: DbNodeType.RacingSession,
        endNodeType: DbNodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingSessionHasPrimeImage, {
        startNodeType: DbNodeType.RacingSession,
        endNodeType: DbNodeType.Image,
        isReverseRelationship: false,
    }],
]
