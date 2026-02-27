import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {NodeType} from "../NodeType"

export const LapTimeRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.LapTimeBelongsToSessionResult, {
        startNodeType: NodeType.LapTime,
        endNodeType: NodeType.SessionResult,
        isReverseRelationship: true,
    }],
    [RelationshipType.LapTimeAchievedOnTrackLayout, {
        startNodeType: NodeType.LapTime,
        endNodeType: NodeType.TrackLayout,
        isReverseRelationship: true,
    }],
    [RelationshipType.LapTimeAchievedWithCarModelVariant, {
        startNodeType: NodeType.LapTime,
        endNodeType: NodeType.CarModelVariant,
        isReverseRelationship: true,
    }],
    [RelationshipType.LapTimeHasImage, {
        startNodeType: NodeType.LapTime,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.LapTimeHasPrimeImage, {
        startNodeType: NodeType.LapTime,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
]
