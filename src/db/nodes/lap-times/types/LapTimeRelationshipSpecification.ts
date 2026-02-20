import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {DbNodeType} from "../../../types/DbNodeType"

export const LapTimeRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.LapTimeBelongsToSessionResult, {
        startNodeType: DbNodeType.LapTime,
        endNodeType: DbNodeType.SessionResult,
        isReverseRelationship: true,
    }],
    [RelationshipType.LapTimeAchievedOnTrackLayout, {
        startNodeType: DbNodeType.LapTime,
        endNodeType: DbNodeType.TrackLayout,
        isReverseRelationship: true,
    }],
    [RelationshipType.LapTimeAchievedWithCarModelVariant, {
        startNodeType: DbNodeType.LapTime,
        endNodeType: DbNodeType.CarModelVariant,
        isReverseRelationship: true,
    }],
    [RelationshipType.LapTimeHasImage, {
        startNodeType: DbNodeType.LapTime,
        endNodeType: DbNodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.LapTimeHasPrimeImage, {
        startNodeType: DbNodeType.LapTime,
        endNodeType: DbNodeType.Image,
        isReverseRelationship: false,
    }],
]
