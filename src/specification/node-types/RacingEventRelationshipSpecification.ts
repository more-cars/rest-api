import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {NodeType} from "../NodeType"

export const RacingEventRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.RacingEventBelongsToRacingSeries, {
        startNodeType: NodeType.RacingEvent,
        endNodeType: NodeType.RacingSeries,
        isReverseRelationship: true,
    }],
    [RelationshipType.RacingEventIsFollowedByEvent, {
        startNodeType: NodeType.RacingEvent,
        endNodeType: NodeType.RacingEvent,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingEventFollowsEvent, {
        startNodeType: NodeType.RacingEvent,
        endNodeType: NodeType.RacingEvent,
        isReverseRelationship: true,
    }],
    [RelationshipType.RacingEventTookPlaceAtRaceTrack, {
        startNodeType: NodeType.RacingEvent,
        endNodeType: NodeType.RaceTrack,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingEventUsedTheTrackLayout, {
        startNodeType: NodeType.RacingEvent,
        endNodeType: NodeType.TrackLayout,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingEventHasRacingSession, {
        startNodeType: NodeType.RacingEvent,
        endNodeType: NodeType.RacingSession,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingEventHasImage, {
        startNodeType: NodeType.RacingEvent,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingEventHasPrimeImage, {
        startNodeType: NodeType.RacingEvent,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
]
