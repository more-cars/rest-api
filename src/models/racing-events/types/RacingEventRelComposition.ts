import {RelType} from "../../relationships/types/RelType"
import {NodeType} from "../../types/NodeType"
import {RelComposition} from "../../relationships/types/RelComposition"

export const RacingEventRelComposition: RelComposition[] = [
    [RelType.RacingEventBelongsToRacingSeries, {
        startNodeType: NodeType.RACING_EVENT,
        endNodeType: NodeType.RACING_SERIES,
        isReverseRelationship: true,
    }],
    [RelType.RacingEventIsFollowedByEvent, {
        startNodeType: NodeType.RACING_EVENT,
        endNodeType: NodeType.RACING_EVENT,
        isReverseRelationship: false,
    }],
    [RelType.RacingEventFollowsEvent, {
        startNodeType: NodeType.RACING_EVENT,
        endNodeType: NodeType.RACING_EVENT,
        isReverseRelationship: true,
    }],
    [RelType.RacingEventTookPlaceAtRaceTrack, {
        startNodeType: NodeType.RACING_EVENT,
        endNodeType: NodeType.RACE_TRACK,
        isReverseRelationship: false,
    }],
    [RelType.RacingEventUsedTheTrackLayout, {
        startNodeType: NodeType.RACING_EVENT,
        endNodeType: NodeType.TRACK_LAYOUT,
        isReverseRelationship: false,
    }],
    [RelType.RacingEventHasRacingSession, {
        startNodeType: NodeType.RACING_EVENT,
        endNodeType: NodeType.RACING_SESSION,
        isReverseRelationship: false,
    }],
    [RelType.RacingEventHasImage, {
        startNodeType: NodeType.RACING_EVENT,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
    [RelType.RacingEventHasPrimeImage, {
        startNodeType: NodeType.RACING_EVENT,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
]
