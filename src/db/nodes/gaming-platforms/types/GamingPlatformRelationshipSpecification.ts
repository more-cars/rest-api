import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const GamingPlatformRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.GamingPlatformFeaturesRacingGame, {
        startNodeLabel: NodeTypeLabel.GamingPlatform,
        endNodeLabel: NodeTypeLabel.RacingGame,
        relationshipName: RelationshipTypeNeo4j.GamingPlatformFeaturesRacingGame,
        isReverseRelationship: false,
    }],
    [RelationshipType.GamingPlatformHasImage, {
        startNodeLabel: NodeTypeLabel.GamingPlatform,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.GamingPlatformHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.GamingPlatformHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.GamingPlatform,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.GamingPlatformHasPrimeImage,
        isReverseRelationship: false,
    }],
]
