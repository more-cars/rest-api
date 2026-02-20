import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {Neo4jNodeType} from "../../../types/Neo4jNodeType"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const CompanyRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.CompanyHasBrand, {
        startNodeLabel: Neo4jNodeType.Company,
        endNodeLabel: Neo4jNodeType.Brand,
        relationshipName: RelationshipTypeNeo4j.CompanyHasBrand,
        isReverseRelationship: false,
    }],
    [RelationshipType.CompanyHasImage, {
        startNodeLabel: Neo4jNodeType.Company,
        endNodeLabel: Neo4jNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.CompanyHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.CompanyHasPrimeImage, {
        startNodeLabel: Neo4jNodeType.Company,
        endNodeLabel: Neo4jNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.CompanyHasPrimeImage,
        isReverseRelationship: false,
    }],
]
