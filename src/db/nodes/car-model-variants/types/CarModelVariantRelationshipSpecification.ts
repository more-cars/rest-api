import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {DbRelationship} from "../../../types/DbRelationship"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const CarModelVariantRelationshipSpecification: RelationshipSpecification[] = [
    [DbRelationship.CarModelVariantIsVariantOf, {
        startNodeLabel: NodeTypeLabel.CarModelVariant,
        endNodeLabel: NodeTypeLabel.CarModel,
        relationshipName: RelationshipTypeNeo4j.CarModelVariantIsVariantOf,
        isReverseRelationship: true,
    }],
    [DbRelationship.CarModelVariantAchievedSessionResult, {
        startNodeLabel: NodeTypeLabel.CarModelVariant,
        endNodeLabel: NodeTypeLabel.SessionResult,
        relationshipName: RelationshipTypeNeo4j.CarModelVariantAchievedSessionResult,
        isReverseRelationship: false,
    }],
    [DbRelationship.CarModelVariantAchievedLapTime, {
        startNodeLabel: NodeTypeLabel.CarModelVariant,
        endNodeLabel: NodeTypeLabel.LapTime,
        relationshipName: RelationshipTypeNeo4j.CarModelVariantAchievedLapTime,
        isReverseRelationship: false,
    }],
    [DbRelationship.CarModelVariantIsFeaturedInRacingGame, {
        startNodeLabel: NodeTypeLabel.CarModelVariant,
        endNodeLabel: NodeTypeLabel.RacingGame,
        relationshipName: RelationshipTypeNeo4j.CarModelVariantIsFeaturedInRacingGame,
        isReverseRelationship: true,
    }],
    [DbRelationship.CarModelVariantHasImage, {
        startNodeLabel: NodeTypeLabel.CarModelVariant,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.CarModelVariantHasImage,
        isReverseRelationship: false,
    }],
    [DbRelationship.CarModelVariantHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.CarModelVariant,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.CarModelVariantHasPrimeImage,
        isReverseRelationship: false,
    }],
]
