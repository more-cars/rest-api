import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {Neo4jNodeType} from "../../../types/Neo4jNodeType"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const LapTimeRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.LapTimeBelongsToSessionResult, {
        startNodeLabel: Neo4jNodeType.LapTime,
        endNodeLabel: Neo4jNodeType.SessionResult,
        relationshipName: RelationshipTypeNeo4j.LapTimeBelongsToSessionResult,
        isReverseRelationship: true,
    }],
    [RelationshipType.LapTimeAchievedOnTrackLayout, {
        startNodeLabel: Neo4jNodeType.LapTime,
        endNodeLabel: Neo4jNodeType.TrackLayout,
        relationshipName: RelationshipTypeNeo4j.LapTimeAchievedOnTrackLayout,
        isReverseRelationship: true,
    }],
    [RelationshipType.LapTimeAchievedWithCarModelVariant, {
        startNodeLabel: Neo4jNodeType.LapTime,
        endNodeLabel: Neo4jNodeType.CarModelVariant,
        relationshipName: RelationshipTypeNeo4j.LapTimeAchievedWithCarModelVariant,
        isReverseRelationship: true,
    }],
    [RelationshipType.LapTimeHasImage, {
        startNodeLabel: Neo4jNodeType.LapTime,
        endNodeLabel: Neo4jNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.LapTimeHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.LapTimeHasPrimeImage, {
        startNodeLabel: Neo4jNodeType.LapTime,
        endNodeLabel: Neo4jNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.LapTimeHasPrimeImage,
        isReverseRelationship: false,
    }],
]
