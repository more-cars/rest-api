import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {DbNodeType} from "../../../types/DbNodeType"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const RacingEventRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.RacingEventBelongsToRacingSeries, {
        startNodeType: DbNodeType.RacingEvent,
        endNodeType: DbNodeType.RacingSeries,
        relationshipName: RelationshipTypeNeo4j.RacingEventBelongsToRacingSeries,
        isReverseRelationship: true,
    }],
    [RelationshipType.RacingEventIsFollowedByEvent, {
        startNodeType: DbNodeType.RacingEvent,
        endNodeType: DbNodeType.RacingEvent,
        relationshipName: RelationshipTypeNeo4j.RacingEventIsFollowedByEvent,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingEventFollowsEvent, {
        startNodeType: DbNodeType.RacingEvent,
        endNodeType: DbNodeType.RacingEvent,
        relationshipName: RelationshipTypeNeo4j.RacingEventFollowsEvent,
        isReverseRelationship: true,
    }],
    [RelationshipType.RacingEventTookPlaceAtRaceTrack, {
        startNodeType: DbNodeType.RacingEvent,
        endNodeType: DbNodeType.RaceTrack,
        relationshipName: RelationshipTypeNeo4j.RacingEventTookPlaceAtRaceTrack,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingEventUsedTheTrackLayout, {
        startNodeType: DbNodeType.RacingEvent,
        endNodeType: DbNodeType.TrackLayout,
        relationshipName: RelationshipTypeNeo4j.RacingEventUsedTheTrackLayout,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingEventHasRacingSession, {
        startNodeType: DbNodeType.RacingEvent,
        endNodeType: DbNodeType.RacingSession,
        relationshipName: RelationshipTypeNeo4j.RacingEventHasRacingSession,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingEventHasImage, {
        startNodeType: DbNodeType.RacingEvent,
        endNodeType: DbNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.RacingEventHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingEventHasPrimeImage, {
        startNodeType: DbNodeType.RacingEvent,
        endNodeType: DbNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.RacingEventHasPrimeImage,
        isReverseRelationship: false,
    }],
]
