import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {NodeType} from "../NodeType"

export const GamingPlatformRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.GamingPlatformFeaturesRacingGame, {
        startNodeType: NodeType.GamingPlatform,
        endNodeType: NodeType.RacingGame,
        isReverseRelationship: false,
    }],
    [RelationshipType.GamingPlatformHasImage, {
        startNodeType: NodeType.GamingPlatform,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.GamingPlatformHasPrimeImage, {
        startNodeType: NodeType.GamingPlatform,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
]
