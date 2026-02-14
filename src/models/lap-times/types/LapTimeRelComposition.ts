import {RelationshipType} from "../../relationships/types/RelationshipType"
import {NodeType} from "../../types/NodeType"
import {RelComposition} from "../../relationships/types/RelComposition"

export const LapTimeRelComposition: RelComposition[] = [
    [RelationshipType.LapTimeBelongsToSessionResult, {
        startNodeType: NodeType.LAP_TIME,
        endNodeType: NodeType.SESSION_RESULT,
        isReverseRelationship: true,
    }],
    [RelationshipType.LapTimeAchievedOnTrackLayout, {
        startNodeType: NodeType.LAP_TIME,
        endNodeType: NodeType.TRACK_LAYOUT,
        isReverseRelationship: true,
    }],
    [RelationshipType.LapTimeAchievedWithCarModelVariant, {
        startNodeType: NodeType.LAP_TIME,
        endNodeType: NodeType.CAR_MODEL_VARIANT,
        isReverseRelationship: true,
    }],
    [RelationshipType.LapTimeHasImage, {
        startNodeType: NodeType.LAP_TIME,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
    [RelationshipType.LapTimeHasPrimeImage, {
        startNodeType: NodeType.LAP_TIME,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
]
