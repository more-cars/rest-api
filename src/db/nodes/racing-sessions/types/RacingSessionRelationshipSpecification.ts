import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {DbNodeType} from "../../../types/DbNodeType"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const RacingSessionRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.RacingSessionBelongsToRacingEvent, {
        startNodeType: DbNodeType.RacingSession,
        endNodeType: DbNodeType.RacingEvent,
        relationshipName: RelationshipTypeNeo4j.RacingSessionBelongsToRacingEvent,
        isReverseRelationship: true,
    }],
    [RelationshipType.RacingSessionHasSessionResult, {
        startNodeType: DbNodeType.RacingSession,
        endNodeType: DbNodeType.SessionResult,
        relationshipName: RelationshipTypeNeo4j.RacingSessionHasSessionResult,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingSessionHasImage, {
        startNodeType: DbNodeType.RacingSession,
        endNodeType: DbNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.RacingSessionHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingSessionHasPrimeImage, {
        startNodeType: DbNodeType.RacingSession,
        endNodeType: DbNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.RacingSessionHasPrimeImage,
        isReverseRelationship: false,
    }],
]
