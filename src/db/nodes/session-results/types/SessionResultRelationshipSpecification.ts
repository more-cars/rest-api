import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {DbRelationship} from "../../../types/DbRelationship"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {DbRelationshipName} from "../../../types/DbRelationshipName"

export const SessionResultRelationshipSpecification: RelationshipSpecification[] = [
    [DbRelationship.SessionResultBelongsToRacingSession, {
        startNodeLabel: NodeTypeLabel.SessionResult,
        endNodeLabel: NodeTypeLabel.RacingSession,
        relationshipName: DbRelationshipName.SessionResultBelongsToRacingSession,
        isReverseRelationship: true,
    }],
    [DbRelationship.SessionResultHasLapTime, {
        startNodeLabel: NodeTypeLabel.SessionResult,
        endNodeLabel: NodeTypeLabel.LapTime,
        relationshipName: DbRelationshipName.SessionResultHasLapTime,
        isReverseRelationship: false,
    }],
    [DbRelationship.SessionResultAchievedWithCarModelVariant, {
        startNodeLabel: NodeTypeLabel.SessionResult,
        endNodeLabel: NodeTypeLabel.CarModelVariant,
        relationshipName: DbRelationshipName.SessionResultAchievedWithCarModelVariant,
        isReverseRelationship: true,
    }],
    [DbRelationship.SessionResultHasImage, {
        startNodeLabel: NodeTypeLabel.SessionResult,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: DbRelationshipName.SessionResultHasImage,
        isReverseRelationship: false,
    }],
    [DbRelationship.SessionResultHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.SessionResult,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: DbRelationshipName.SessionResultHasPrimeImage,
        isReverseRelationship: false,
    }],
]
