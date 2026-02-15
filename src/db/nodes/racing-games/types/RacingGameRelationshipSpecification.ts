import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {DbRelationship} from "../../../types/DbRelationship"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {DbRelationshipName} from "../../../types/DbRelationshipName"

export const RacingGameRelationshipSpecification: RelationshipSpecification[] = [
    [DbRelationship.RacingGameFeaturesCarModelVariant, {
        startNodeLabel: NodeTypeLabel.RacingGame,
        endNodeLabel: NodeTypeLabel.CarModelVariant,
        relationshipName: DbRelationshipName.RacingGameFeaturesCarModelVariant,
        isReverseRelationship: false,
    }],
    [DbRelationship.RacingGameFeaturesTrackLayout, {
        startNodeLabel: NodeTypeLabel.RacingGame,
        endNodeLabel: NodeTypeLabel.TrackLayout,
        relationshipName: DbRelationshipName.RacingGameFeaturesTrackLayout,
        isReverseRelationship: false,
    }],
    [DbRelationship.RacingGameReleasedOnGamingPlatform, {
        startNodeLabel: NodeTypeLabel.RacingGame,
        endNodeLabel: NodeTypeLabel.GamingPlatform,
        relationshipName: DbRelationshipName.RacingGameReleasedOnGamingPlatform,
        isReverseRelationship: true,
    }],
    [DbRelationship.RacingGameHasImage, {
        startNodeLabel: NodeTypeLabel.RacingGame,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: DbRelationshipName.RacingGameHasImage,
        isReverseRelationship: false,
    }],
    [DbRelationship.RacingGameHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.RacingGame,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: DbRelationshipName.RacingGameHasPrimeImage,
        isReverseRelationship: false,
    }],
]
