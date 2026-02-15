import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {DbRelationship} from "../../../types/DbRelationship"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {DbRelationshipName} from "../../../types/DbRelationshipName"

export const CarModelVariantRelationshipSpecification: RelationshipSpecification[] = [
    [DbRelationship.CarModelVariantIsVariantOf, {
        startNodeLabel: NodeTypeLabel.CarModelVariant,
        endNodeLabel: NodeTypeLabel.CarModel,
        relationshipName: DbRelationshipName.CarModelVariantIsVariantOf,
        isReverseRelationship: true,
    }],
    [DbRelationship.CarModelVariantAchievedSessionResult, {
        startNodeLabel: NodeTypeLabel.CarModelVariant,
        endNodeLabel: NodeTypeLabel.SessionResult,
        relationshipName: DbRelationshipName.CarModelVariantAchievedSessionResult,
        isReverseRelationship: false,
    }],
    [DbRelationship.CarModelVariantAchievedLapTime, {
        startNodeLabel: NodeTypeLabel.CarModelVariant,
        endNodeLabel: NodeTypeLabel.LapTime,
        relationshipName: DbRelationshipName.CarModelVariantAchievedLapTime,
        isReverseRelationship: false,
    }],
    [DbRelationship.CarModelVariantIsFeaturedInRacingGame, {
        startNodeLabel: NodeTypeLabel.CarModelVariant,
        endNodeLabel: NodeTypeLabel.RacingGame,
        relationshipName: DbRelationshipName.CarModelVariantIsFeaturedInRacingGame,
        isReverseRelationship: true,
    }],
    [DbRelationship.CarModelVariantHasImage, {
        startNodeLabel: NodeTypeLabel.CarModelVariant,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: DbRelationshipName.CarModelVariantHasImage,
        isReverseRelationship: false,
    }],
    [DbRelationship.CarModelVariantHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.CarModelVariant,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: DbRelationshipName.CarModelVariantHasPrimeImage,
        isReverseRelationship: false,
    }],
]
