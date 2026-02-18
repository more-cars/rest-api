import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {DbRelationship} from "../../../types/DbRelationship"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const LapTimeRelationshipSpecification: RelationshipSpecification[] = [
    [DbRelationship.LapTimeBelongsToSessionResult, {
        startNodeLabel: NodeTypeLabel.LapTime,
        endNodeLabel: NodeTypeLabel.SessionResult,
        relationshipName: RelationshipTypeNeo4j.LapTimeBelongsToSessionResult,
        isReverseRelationship: true,
    }],
    [DbRelationship.LapTimeAchievedOnTrackLayout, {
        startNodeLabel: NodeTypeLabel.LapTime,
        endNodeLabel: NodeTypeLabel.TrackLayout,
        relationshipName: RelationshipTypeNeo4j.LapTimeAchievedOnTrackLayout,
        isReverseRelationship: true,
    }],
    [DbRelationship.LapTimeAchievedWithCarModelVariant, {
        startNodeLabel: NodeTypeLabel.LapTime,
        endNodeLabel: NodeTypeLabel.CarModelVariant,
        relationshipName: RelationshipTypeNeo4j.LapTimeAchievedWithCarModelVariant,
        isReverseRelationship: true,
    }],
    [DbRelationship.LapTimeHasImage, {
        startNodeLabel: NodeTypeLabel.LapTime,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.LapTimeHasImage,
        isReverseRelationship: false,
    }],
    [DbRelationship.LapTimeHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.LapTime,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.LapTimeHasPrimeImage,
        isReverseRelationship: false,
    }],
]
