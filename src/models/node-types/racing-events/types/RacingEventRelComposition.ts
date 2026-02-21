import {RelComposition} from "../../../relationships/types/RelComposition"
import {RelType} from "../../../relationships/types/RelType"
import {ModelNodeType} from "../../../types/ModelNodeType"

export const RacingEventRelComposition: RelComposition[] = [
    [RelType.RacingEventBelongsToRacingSeries, {
        startNodeType: ModelNodeType.RacingEvent,
        endNodeType: ModelNodeType.RacingSeries,
        isReverseRelationship: true,
    }],
    [RelType.RacingEventIsFollowedByEvent, {
        startNodeType: ModelNodeType.RacingEvent,
        endNodeType: ModelNodeType.RacingEvent,
        isReverseRelationship: false,
    }],
    [RelType.RacingEventFollowsEvent, {
        startNodeType: ModelNodeType.RacingEvent,
        endNodeType: ModelNodeType.RacingEvent,
        isReverseRelationship: true,
    }],
    [RelType.RacingEventTookPlaceAtRaceTrack, {
        startNodeType: ModelNodeType.RacingEvent,
        endNodeType: ModelNodeType.RaceTrack,
        isReverseRelationship: false,
    }],
    [RelType.RacingEventUsedTheTrackLayout, {
        startNodeType: ModelNodeType.RacingEvent,
        endNodeType: ModelNodeType.TrackLayout,
        isReverseRelationship: false,
    }],
    [RelType.RacingEventHasRacingSession, {
        startNodeType: ModelNodeType.RacingEvent,
        endNodeType: ModelNodeType.RacingSession,
        isReverseRelationship: false,
    }],
    [RelType.RacingEventHasImage, {
        startNodeType: ModelNodeType.RacingEvent,
        endNodeType: ModelNodeType.Image,
        isReverseRelationship: false,
    }],
    [RelType.RacingEventHasPrimeImage, {
        startNodeType: ModelNodeType.RacingEvent,
        endNodeType: ModelNodeType.Image,
        isReverseRelationship: false,
    }],
]
