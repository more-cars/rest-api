import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {DbRelationship} from "../../../types/DbRelationship"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const GamingPlatformRelationshipSpecification: RelationshipSpecification[] = [
    [DbRelationship.GamingPlatformFeaturesRacingGame, {
        startNodeLabel: NodeTypeLabel.GamingPlatform,
        endNodeLabel: NodeTypeLabel.RacingGame,
        relationshipName: RelationshipTypeNeo4j.GamingPlatformFeaturesRacingGame,
        isReverseRelationship: false,
    }],
    [DbRelationship.GamingPlatformHasImage, {
        startNodeLabel: NodeTypeLabel.GamingPlatform,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.GamingPlatformHasImage,
        isReverseRelationship: false,
    }],
    [DbRelationship.GamingPlatformHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.GamingPlatform,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.GamingPlatformHasPrimeImage,
        isReverseRelationship: false,
    }],
]
