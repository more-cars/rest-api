import {RelationshipType} from "../../relationships/types/RelationshipType"
import {NodeType} from "../../types/NodeType"
import {RelComposition} from "../../relationships/types/RelComposition"

export const RacingEventRelComposition: RelComposition[] = [
    [RelationshipType.RacingEventBelongsToRacingSeries, {
        startNodeType: NodeType.RACING_EVENT,
        endNodeType: NodeType.RACING_SERIES,
        isReverseRelationship: true,
    }],
    [RelationshipType.RacingEventIsFollowedByEvent, {
        startNodeType: NodeType.RACING_EVENT,
        endNodeType: NodeType.RACING_EVENT,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingEventFollowsEvent, {
        startNodeType: NodeType.RACING_EVENT,
        endNodeType: NodeType.RACING_EVENT,
        isReverseRelationship: true,
    }],
    [RelationshipType.RacingEventTookPlaceAtRaceTrack, {
        startNodeType: NodeType.RACING_EVENT,
        endNodeType: NodeType.RACE_TRACK,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingEventUsedTheTrackLayout, {
        startNodeType: NodeType.RACING_EVENT,
        endNodeType: NodeType.TRACK_LAYOUT,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingEventHasRacingSession, {
        startNodeType: NodeType.RACING_EVENT,
        endNodeType: NodeType.RACING_SESSION,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingEventHasImage, {
        startNodeType: NodeType.RACING_EVENT,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingEventHasPrimeImage, {
        startNodeType: NodeType.RACING_EVENT,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
]
