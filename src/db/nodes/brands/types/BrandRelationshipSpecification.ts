import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {Neo4jNodeType} from "../../../types/Neo4jNodeType"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const BrandRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.BrandBelongsToCompany, {
        startNodeLabel: Neo4jNodeType.Brand,
        endNodeLabel: Neo4jNodeType.Company,
        relationshipName: RelationshipTypeNeo4j.BrandBelongsToCompany,
        isReverseRelationship: true,
    }],
    [RelationshipType.BrandHasCarModel, {
        startNodeLabel: Neo4jNodeType.Brand,
        endNodeLabel: Neo4jNodeType.CarModel,
        relationshipName: RelationshipTypeNeo4j.BrandHasCarModel,
        isReverseRelationship: false,
    }],
    [RelationshipType.BrandHasImage, {
        startNodeLabel: Neo4jNodeType.Brand,
        endNodeLabel: Neo4jNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.BrandHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.BrandHasPrimeImage, {
        startNodeLabel: Neo4jNodeType.Brand,
        endNodeLabel: Neo4jNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.BrandHasPrimeImage,
        isReverseRelationship: false,
    }],
]
