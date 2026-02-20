import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {DbNodeType} from "../../../types/DbNodeType"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const LapTimeRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.LapTimeBelongsToSessionResult, {
        startNodeType: DbNodeType.LapTime,
        endNodeType: DbNodeType.SessionResult,
        relationshipName: RelationshipTypeNeo4j.LapTimeBelongsToSessionResult,
        isReverseRelationship: true,
    }],
    [RelationshipType.LapTimeAchievedOnTrackLayout, {
        startNodeType: DbNodeType.LapTime,
        endNodeType: DbNodeType.TrackLayout,
        relationshipName: RelationshipTypeNeo4j.LapTimeAchievedOnTrackLayout,
        isReverseRelationship: true,
    }],
    [RelationshipType.LapTimeAchievedWithCarModelVariant, {
        startNodeType: DbNodeType.LapTime,
        endNodeType: DbNodeType.CarModelVariant,
        relationshipName: RelationshipTypeNeo4j.LapTimeAchievedWithCarModelVariant,
        isReverseRelationship: true,
    }],
    [RelationshipType.LapTimeHasImage, {
        startNodeType: DbNodeType.LapTime,
        endNodeType: DbNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.LapTimeHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.LapTimeHasPrimeImage, {
        startNodeType: DbNodeType.LapTime,
        endNodeType: DbNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.LapTimeHasPrimeImage,
        isReverseRelationship: false,
    }],
]
