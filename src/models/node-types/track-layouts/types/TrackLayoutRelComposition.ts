import {RelComposition} from "../../../relationships/types/RelComposition"
import {RelType} from "../../../relationships/types/RelType"
import {ModelNodeType} from "../../../types/ModelNodeType"

export const TrackLayoutRelComposition: RelComposition[] = [
    [RelType.TrackLayoutBelongsToRaceTrack, {
        startNodeType: ModelNodeType.TrackLayout,
        endNodeType: ModelNodeType.RaceTrack,
        isReverseRelationship: true,
    }],
    [RelType.TrackLayoutWasUsedByRacingEvent, {
        startNodeType: ModelNodeType.TrackLayout,
        endNodeType: ModelNodeType.RacingEvent,
        isReverseRelationship: true,
    }],
    [RelType.TrackLayoutHasLapTime, {
        startNodeType: ModelNodeType.TrackLayout,
        endNodeType: ModelNodeType.LapTime,
        isReverseRelationship: false,
    }],
    [RelType.TrackLayoutIsFeaturedInRacingGame, {
        startNodeType: ModelNodeType.TrackLayout,
        endNodeType: ModelNodeType.RacingGame,
        isReverseRelationship: true,
    }],
    [RelType.TrackLayoutHasImage, {
        startNodeType: ModelNodeType.TrackLayout,
        endNodeType: ModelNodeType.Image,
        isReverseRelationship: false,
    }],
    [RelType.TrackLayoutHasPrimeImage, {
        startNodeType: ModelNodeType.TrackLayout,
        endNodeType: ModelNodeType.Image,
        isReverseRelationship: false,
    }],
]
