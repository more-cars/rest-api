import {RelComposition} from "../../../relationships/types/RelComposition"
import {RelType} from "../../../relationships/types/RelType"
import {ModelNodeType} from "../../../types/ModelNodeType"

export const LapTimeRelComposition: RelComposition[] = [
    [RelType.LapTimeBelongsToSessionResult, {
        startNodeType: ModelNodeType.LapTime,
        endNodeType: ModelNodeType.SessionResult,
        isReverseRelationship: true,
    }],
    [RelType.LapTimeAchievedOnTrackLayout, {
        startNodeType: ModelNodeType.LapTime,
        endNodeType: ModelNodeType.TrackLayout,
        isReverseRelationship: true,
    }],
    [RelType.LapTimeAchievedWithCarModelVariant, {
        startNodeType: ModelNodeType.LapTime,
        endNodeType: ModelNodeType.CarModelVariant,
        isReverseRelationship: true,
    }],
    [RelType.LapTimeHasImage, {
        startNodeType: ModelNodeType.LapTime,
        endNodeType: ModelNodeType.Image,
        isReverseRelationship: false,
    }],
    [RelType.LapTimeHasPrimeImage, {
        startNodeType: ModelNodeType.LapTime,
        endNodeType: ModelNodeType.Image,
        isReverseRelationship: false,
    }],
]
