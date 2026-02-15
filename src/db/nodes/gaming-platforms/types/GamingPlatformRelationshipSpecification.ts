import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {DbRelationship} from "../../../types/DbRelationship"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {DbRelationshipName} from "../../../types/DbRelationshipName"

export const GamingPlatformRelationshipSpecification: RelationshipSpecification[] = [
    [DbRelationship.GamingPlatformFeaturesRacingGame, {
        startNodeLabel: NodeTypeLabel.GamingPlatform,
        endNodeLabel: NodeTypeLabel.RacingGame,
        relationshipName: DbRelationshipName.GamingPlatformFeaturesRacingGame,
        isReverseRelationship: false,
    }],
    [DbRelationship.GamingPlatformHasImage, {
        startNodeLabel: NodeTypeLabel.GamingPlatform,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: DbRelationshipName.GamingPlatformHasImage,
        isReverseRelationship: false,
    }],
    [DbRelationship.GamingPlatformHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.GamingPlatform,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: DbRelationshipName.GamingPlatformHasPrimeImage,
        isReverseRelationship: false,
    }],
]
