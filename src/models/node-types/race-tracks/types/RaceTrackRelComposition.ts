import {RelType} from "../../../relationships/types/RelType"
import {NodeType} from "../../../types/NodeType"
import {RelComposition} from "../../../relationships/types/RelComposition"

export const RaceTrackRelComposition: RelComposition[] = [
    [RelType.RaceTrackHasLayout, {
        startNodeType: NodeType.RACE_TRACK,
        endNodeType: NodeType.TRACK_LAYOUT,
        isReverseRelationship: false,
    }],
    [RelType.RaceTrackHostedRacingEvent, {
        startNodeType: NodeType.RACE_TRACK,
        endNodeType: NodeType.RACING_EVENT,
        isReverseRelationship: true,
    }],
    [RelType.RaceTrackHasImage, {
        startNodeType: NodeType.RACE_TRACK,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
    [RelType.RaceTrackHasPrimeImage, {
        startNodeType: NodeType.RACE_TRACK,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
]
