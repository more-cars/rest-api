import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {Neo4jNodeType} from "../../../types/Neo4jNodeType"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const CarModelRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.CarModelBelongsToBrand, {
        startNodeLabel: Neo4jNodeType.CarModel,
        endNodeLabel: Neo4jNodeType.Brand,
        relationshipName: RelationshipTypeNeo4j.CarModelBelongsToBrand,
        isReverseRelationship: true,
    }],
    [RelationshipType.CarModelHasSuccessor, {
        startNodeLabel: Neo4jNodeType.CarModel,
        endNodeLabel: Neo4jNodeType.CarModel,
        relationshipName: RelationshipTypeNeo4j.CarModelHasSuccessor,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelIsSuccessorOf, {
        startNodeLabel: Neo4jNodeType.CarModel,
        endNodeLabel: Neo4jNodeType.CarModel,
        relationshipName: RelationshipTypeNeo4j.CarModelIsSuccessorOf,
        isReverseRelationship: true,
    }],
    [RelationshipType.CarModelHasVariant, {
        startNodeLabel: Neo4jNodeType.CarModel,
        endNodeLabel: Neo4jNodeType.CarModelVariant,
        relationshipName: RelationshipTypeNeo4j.CarModelHasVariant,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelHasImage, {
        startNodeLabel: Neo4jNodeType.CarModel,
        endNodeLabel: Neo4jNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.CarModelHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelHasPrimeImage, {
        startNodeLabel: Neo4jNodeType.CarModel,
        endNodeLabel: Neo4jNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.CarModelHasPrimeImage,
        isReverseRelationship: false,
    }],
]
