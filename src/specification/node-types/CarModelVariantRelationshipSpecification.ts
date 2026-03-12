import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {NodeType} from "../NodeType"

export const CarModelVariantRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.CarModelVariantIsVariantOf, {
        startNodeType: NodeType.CarModelVariant,
        endNodeType: NodeType.CarModel,
        isReverseRelationship: true,
    }],
    [RelationshipType.CarModelVariantAchievedSessionResult, {
        startNodeType: NodeType.CarModelVariant,
        endNodeType: NodeType.SessionResult,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelVariantAchievedLapTime, {
        startNodeType: NodeType.CarModelVariant,
        endNodeType: NodeType.LapTime,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelVariantIsPresentedInMagazineIssue, {
        startNodeType: NodeType.CarModelVariant,
        endNodeType: NodeType.MagazineIssue,
        isReverseRelationship: true,
    }],
    [RelationshipType.CarModelVariantReviewedByMagazineIssueWithRating, {
        startNodeType: NodeType.CarModelVariant,
        endNodeType: NodeType.Rating,
        isReverseRelationship: true,
    }],
    [RelationshipType.CarModelVariantFeaturedInProgrammeEpisode, {
        startNodeType: NodeType.CarModelVariant,
        endNodeType: NodeType.ProgrammeEpisode,
        isReverseRelationship: true,
    }],
    [RelationshipType.CarModelVariantIsFeaturedInRacingGame, {
        startNodeType: NodeType.CarModelVariant,
        endNodeType: NodeType.RacingGame,
        isReverseRelationship: true,
    }],
    [RelationshipType.CarModelVariantPresentedAtMotorShow, {
        startNodeType: NodeType.CarModelVariant,
        endNodeType: NodeType.MotorShow,
        isReverseRelationship: true,
    }],
    [RelationshipType.CarModelVariantHasImage, {
        startNodeType: NodeType.CarModelVariant,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelVariantHasPrimeImage, {
        startNodeType: NodeType.CarModelVariant,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
    //
]
