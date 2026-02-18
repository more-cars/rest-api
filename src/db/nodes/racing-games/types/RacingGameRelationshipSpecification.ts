import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {DbRelationship} from "../../../types/DbRelationship"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const RacingGameRelationshipSpecification: RelationshipSpecification[] = [
    [DbRelationship.RacingGameFeaturesCarModelVariant, {
        startNodeLabel: NodeTypeLabel.RacingGame,
        endNodeLabel: NodeTypeLabel.CarModelVariant,
        relationshipName: RelationshipTypeNeo4j.RacingGameFeaturesCarModelVariant,
        isReverseRelationship: false,
    }],
    [DbRelationship.RacingGameFeaturesTrackLayout, {
        startNodeLabel: NodeTypeLabel.RacingGame,
        endNodeLabel: NodeTypeLabel.TrackLayout,
        relationshipName: RelationshipTypeNeo4j.RacingGameFeaturesTrackLayout,
        isReverseRelationship: false,
    }],
    [DbRelationship.RacingGameReleasedOnGamingPlatform, {
        startNodeLabel: NodeTypeLabel.RacingGame,
        endNodeLabel: NodeTypeLabel.GamingPlatform,
        relationshipName: RelationshipTypeNeo4j.RacingGameReleasedOnGamingPlatform,
        isReverseRelationship: true,
    }],
    [DbRelationship.RacingGameHasImage, {
        startNodeLabel: NodeTypeLabel.RacingGame,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.RacingGameHasImage,
        isReverseRelationship: false,
    }],
    [DbRelationship.RacingGameHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.RacingGame,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.RacingGameHasPrimeImage,
        isReverseRelationship: false,
    }],
]
