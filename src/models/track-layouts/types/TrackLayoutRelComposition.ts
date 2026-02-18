import {RelType} from "../../relationships/types/RelType"
import {NodeType} from "../../types/NodeType"
import {RelComposition} from "../../relationships/types/RelComposition"

export const TrackLayoutRelComposition: RelComposition[] = [
    [RelType.TrackLayoutBelongsToRaceTrack, {
        startNodeType: NodeType.TRACK_LAYOUT,
        endNodeType: NodeType.RACE_TRACK,
        isReverseRelationship: true,
    }],
    [RelType.TrackLayoutWasUsedByRacingEvent, {
        startNodeType: NodeType.TRACK_LAYOUT,
        endNodeType: NodeType.RACING_EVENT,
        isReverseRelationship: true,
    }],
    [RelType.TrackLayoutHasLapTime, {
        startNodeType: NodeType.TRACK_LAYOUT,
        endNodeType: NodeType.LAP_TIME,
        isReverseRelationship: false,
    }],
    [RelType.TrackLayoutIsFeaturedInRacingGame, {
        startNodeType: NodeType.TRACK_LAYOUT,
        endNodeType: NodeType.RACING_GAME,
        isReverseRelationship: true,
    }],
    [RelType.TrackLayoutHasImage, {
        startNodeType: NodeType.TRACK_LAYOUT,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
    [RelType.TrackLayoutHasPrimeImage, {
        startNodeType: NodeType.TRACK_LAYOUT,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
]
