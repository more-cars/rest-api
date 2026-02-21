import {RelComposition} from "../../../relationships/types/RelComposition"
import {RelType} from "../../../relationships/types/RelType"
import {ModelNodeType} from "../../../types/ModelNodeType"

export const RaceTrackRelComposition: RelComposition[] = [
    [RelType.RaceTrackHasLayout, {
        startNodeType: ModelNodeType.RaceTrack,
        endNodeType: ModelNodeType.TrackLayout,
        isReverseRelationship: false,
    }],
    [RelType.RaceTrackHostedRacingEvent, {
        startNodeType: ModelNodeType.RaceTrack,
        endNodeType: ModelNodeType.RacingEvent,
        isReverseRelationship: true,
    }],
    [RelType.RaceTrackHasImage, {
        startNodeType: ModelNodeType.RaceTrack,
        endNodeType: ModelNodeType.Image,
        isReverseRelationship: false,
    }],
    [RelType.RaceTrackHasPrimeImage, {
        startNodeType: ModelNodeType.RaceTrack,
        endNodeType: ModelNodeType.Image,
        isReverseRelationship: false,
    }],
]
