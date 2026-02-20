import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {Neo4jNodeType} from "../../../types/Neo4jNodeType"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const GamingPlatformRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.GamingPlatformFeaturesRacingGame, {
        startNodeLabel: Neo4jNodeType.GamingPlatform,
        endNodeLabel: Neo4jNodeType.RacingGame,
        relationshipName: RelationshipTypeNeo4j.GamingPlatformFeaturesRacingGame,
        isReverseRelationship: false,
    }],
    [RelationshipType.GamingPlatformHasImage, {
        startNodeLabel: Neo4jNodeType.GamingPlatform,
        endNodeLabel: Neo4jNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.GamingPlatformHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.GamingPlatformHasPrimeImage, {
        startNodeLabel: Neo4jNodeType.GamingPlatform,
        endNodeLabel: Neo4jNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.GamingPlatformHasPrimeImage,
        isReverseRelationship: false,
    }],
]
