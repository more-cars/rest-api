import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../../db/types/RelationshipType"
import {DbNodeType} from "../../db/types/DbNodeType"

export const RacingEventRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.RacingEventBelongsToRacingSeries, {
        startNodeType: DbNodeType.RacingEvent,
        endNodeType: DbNodeType.RacingSeries,
        isReverseRelationship: true,
    }],
    [RelationshipType.RacingEventIsFollowedByEvent, {
        startNodeType: DbNodeType.RacingEvent,
        endNodeType: DbNodeType.RacingEvent,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingEventFollowsEvent, {
        startNodeType: DbNodeType.RacingEvent,
        endNodeType: DbNodeType.RacingEvent,
        isReverseRelationship: true,
    }],
    [RelationshipType.RacingEventTookPlaceAtRaceTrack, {
        startNodeType: DbNodeType.RacingEvent,
        endNodeType: DbNodeType.RaceTrack,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingEventUsedTheTrackLayout, {
        startNodeType: DbNodeType.RacingEvent,
        endNodeType: DbNodeType.TrackLayout,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingEventHasRacingSession, {
        startNodeType: DbNodeType.RacingEvent,
        endNodeType: DbNodeType.RacingSession,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingEventHasImage, {
        startNodeType: DbNodeType.RacingEvent,
        endNodeType: DbNodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingEventHasPrimeImage, {
        startNodeType: DbNodeType.RacingEvent,
        endNodeType: DbNodeType.Image,
        isReverseRelationship: false,
    }],
]
