import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const RacingGameRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.RacingGameFeaturesCarModelVariant, {
        startNodeLabel: NodeTypeLabel.RacingGame,
        endNodeLabel: NodeTypeLabel.CarModelVariant,
        relationshipName: RelationshipTypeNeo4j.RacingGameFeaturesCarModelVariant,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingGameFeaturesTrackLayout, {
        startNodeLabel: NodeTypeLabel.RacingGame,
        endNodeLabel: NodeTypeLabel.TrackLayout,
        relationshipName: RelationshipTypeNeo4j.RacingGameFeaturesTrackLayout,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingGameReleasedOnGamingPlatform, {
        startNodeLabel: NodeTypeLabel.RacingGame,
        endNodeLabel: NodeTypeLabel.GamingPlatform,
        relationshipName: RelationshipTypeNeo4j.RacingGameReleasedOnGamingPlatform,
        isReverseRelationship: true,
    }],
    [RelationshipType.RacingGameHasImage, {
        startNodeLabel: NodeTypeLabel.RacingGame,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.RacingGameHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingGameHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.RacingGame,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.RacingGameHasPrimeImage,
        isReverseRelationship: false,
    }],
]
