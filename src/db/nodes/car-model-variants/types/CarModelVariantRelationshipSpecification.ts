import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const CarModelVariantRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.CarModelVariantIsVariantOf, {
        startNodeLabel: NodeTypeLabel.CarModelVariant,
        endNodeLabel: NodeTypeLabel.CarModel,
        relationshipName: RelationshipTypeNeo4j.CarModelVariantIsVariantOf,
        isReverseRelationship: true,
    }],
    [RelationshipType.CarModelVariantAchievedSessionResult, {
        startNodeLabel: NodeTypeLabel.CarModelVariant,
        endNodeLabel: NodeTypeLabel.SessionResult,
        relationshipName: RelationshipTypeNeo4j.CarModelVariantAchievedSessionResult,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelVariantAchievedLapTime, {
        startNodeLabel: NodeTypeLabel.CarModelVariant,
        endNodeLabel: NodeTypeLabel.LapTime,
        relationshipName: RelationshipTypeNeo4j.CarModelVariantAchievedLapTime,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelVariantIsFeaturedInRacingGame, {
        startNodeLabel: NodeTypeLabel.CarModelVariant,
        endNodeLabel: NodeTypeLabel.RacingGame,
        relationshipName: RelationshipTypeNeo4j.CarModelVariantIsFeaturedInRacingGame,
        isReverseRelationship: true,
    }],
    [RelationshipType.CarModelVariantHasImage, {
        startNodeLabel: NodeTypeLabel.CarModelVariant,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.CarModelVariantHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelVariantHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.CarModelVariant,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.CarModelVariantHasPrimeImage,
        isReverseRelationship: false,
    }],
]
