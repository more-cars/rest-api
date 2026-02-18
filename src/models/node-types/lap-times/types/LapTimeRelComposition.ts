import {RelType} from "../../../relationships/types/RelType"
import {NodeType} from "../../../types/NodeType"
import {RelComposition} from "../../../relationships/types/RelComposition"

export const LapTimeRelComposition: RelComposition[] = [
    [RelType.LapTimeBelongsToSessionResult, {
        startNodeType: NodeType.LAP_TIME,
        endNodeType: NodeType.SESSION_RESULT,
        isReverseRelationship: true,
    }],
    [RelType.LapTimeAchievedOnTrackLayout, {
        startNodeType: NodeType.LAP_TIME,
        endNodeType: NodeType.TRACK_LAYOUT,
        isReverseRelationship: true,
    }],
    [RelType.LapTimeAchievedWithCarModelVariant, {
        startNodeType: NodeType.LAP_TIME,
        endNodeType: NodeType.CAR_MODEL_VARIANT,
        isReverseRelationship: true,
    }],
    [RelType.LapTimeHasImage, {
        startNodeType: NodeType.LAP_TIME,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
    [RelType.LapTimeHasPrimeImage, {
        startNodeType: NodeType.LAP_TIME,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
]
