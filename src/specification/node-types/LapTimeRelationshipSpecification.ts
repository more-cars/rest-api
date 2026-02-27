import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../../db/types/RelationshipType"
import {DbNodeType} from "../../db/types/DbNodeType"

export const LapTimeRelationshipSpecification: RelationshipTypeSpecification[] = [
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
