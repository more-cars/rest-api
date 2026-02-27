import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../../db/types/RelationshipType"
import {DbNodeType} from "../../db/types/DbNodeType"

export const RacingSessionRelationshipSpecification: RelationshipTypeSpecification[] = [
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
