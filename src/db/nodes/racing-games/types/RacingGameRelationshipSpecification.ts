import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {Neo4jNodeType} from "../../../types/Neo4jNodeType"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const RacingGameRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.RacingGameFeaturesCarModelVariant, {
        startNodeLabel: Neo4jNodeType.RacingGame,
        endNodeLabel: Neo4jNodeType.CarModelVariant,
        relationshipName: RelationshipTypeNeo4j.RacingGameFeaturesCarModelVariant,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingGameFeaturesTrackLayout, {
        startNodeLabel: Neo4jNodeType.RacingGame,
        endNodeLabel: Neo4jNodeType.TrackLayout,
        relationshipName: RelationshipTypeNeo4j.RacingGameFeaturesTrackLayout,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingGameReleasedOnGamingPlatform, {
        startNodeLabel: Neo4jNodeType.RacingGame,
        endNodeLabel: Neo4jNodeType.GamingPlatform,
        relationshipName: RelationshipTypeNeo4j.RacingGameReleasedOnGamingPlatform,
        isReverseRelationship: true,
    }],
    [RelationshipType.RacingGameHasImage, {
        startNodeLabel: Neo4jNodeType.RacingGame,
        endNodeLabel: Neo4jNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.RacingGameHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingGameHasPrimeImage, {
        startNodeLabel: Neo4jNodeType.RacingGame,
        endNodeLabel: Neo4jNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.RacingGameHasPrimeImage,
        isReverseRelationship: false,
    }],
]
