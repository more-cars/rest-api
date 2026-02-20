import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {DbNodeType} from "../../../types/DbNodeType"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const GamingPlatformRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.GamingPlatformFeaturesRacingGame, {
        startNodeType: DbNodeType.GamingPlatform,
        endNodeType: DbNodeType.RacingGame,
        relationshipName: RelationshipTypeNeo4j.GamingPlatformFeaturesRacingGame,
        isReverseRelationship: false,
    }],
    [RelationshipType.GamingPlatformHasImage, {
        startNodeType: DbNodeType.GamingPlatform,
        endNodeType: DbNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.GamingPlatformHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.GamingPlatformHasPrimeImage, {
        startNodeType: DbNodeType.GamingPlatform,
        endNodeType: DbNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.GamingPlatformHasPrimeImage,
        isReverseRelationship: false,
    }],
]
