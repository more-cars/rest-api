import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {DbRelationship} from "../../../types/DbRelationship"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {DbRelationshipName} from "../../../types/DbRelationshipName"

export const LapTimeRelationshipSpecification: RelationshipSpecification[] = [
    [DbRelationship.LapTimeBelongsToSessionResult, {
        startNodeLabel: NodeTypeLabel.LapTime,
        endNodeLabel: NodeTypeLabel.SessionResult,
        relationshipName: DbRelationshipName.LapTimeBelongsToSessionResult,
        isReverseRelationship: true,
    }],
    [DbRelationship.LapTimeAchievedOnTrackLayout, {
        startNodeLabel: NodeTypeLabel.LapTime,
        endNodeLabel: NodeTypeLabel.TrackLayout,
        relationshipName: DbRelationshipName.LapTimeAchievedOnTrackLayout,
        isReverseRelationship: true,
    }],
    [DbRelationship.LapTimeAchievedWithCarModelVariant, {
        startNodeLabel: NodeTypeLabel.LapTime,
        endNodeLabel: NodeTypeLabel.CarModelVariant,
        relationshipName: DbRelationshipName.LapTimeAchievedWithCarModelVariant,
        isReverseRelationship: true,
    }],
    [DbRelationship.LapTimeHasImage, {
        startNodeLabel: NodeTypeLabel.LapTime,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: DbRelationshipName.LapTimeHasImage,
        isReverseRelationship: false,
    }],
    [DbRelationship.LapTimeHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.LapTime,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: DbRelationshipName.LapTimeHasPrimeImage,
        isReverseRelationship: false,
    }],
]
