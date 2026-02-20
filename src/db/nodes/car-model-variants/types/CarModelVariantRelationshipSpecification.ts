import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {Neo4jNodeType} from "../../../types/Neo4jNodeType"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const CarModelVariantRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.CarModelVariantIsVariantOf, {
        startNodeLabel: Neo4jNodeType.CarModelVariant,
        endNodeLabel: Neo4jNodeType.CarModel,
        relationshipName: RelationshipTypeNeo4j.CarModelVariantIsVariantOf,
        isReverseRelationship: true,
    }],
    [RelationshipType.CarModelVariantAchievedSessionResult, {
        startNodeLabel: Neo4jNodeType.CarModelVariant,
        endNodeLabel: Neo4jNodeType.SessionResult,
        relationshipName: RelationshipTypeNeo4j.CarModelVariantAchievedSessionResult,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelVariantAchievedLapTime, {
        startNodeLabel: Neo4jNodeType.CarModelVariant,
        endNodeLabel: Neo4jNodeType.LapTime,
        relationshipName: RelationshipTypeNeo4j.CarModelVariantAchievedLapTime,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelVariantIsFeaturedInRacingGame, {
        startNodeLabel: Neo4jNodeType.CarModelVariant,
        endNodeLabel: Neo4jNodeType.RacingGame,
        relationshipName: RelationshipTypeNeo4j.CarModelVariantIsFeaturedInRacingGame,
        isReverseRelationship: true,
    }],
    [RelationshipType.CarModelVariantHasImage, {
        startNodeLabel: Neo4jNodeType.CarModelVariant,
        endNodeLabel: Neo4jNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.CarModelVariantHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelVariantHasPrimeImage, {
        startNodeLabel: Neo4jNodeType.CarModelVariant,
        endNodeLabel: Neo4jNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.CarModelVariantHasPrimeImage,
        isReverseRelationship: false,
    }],
]
