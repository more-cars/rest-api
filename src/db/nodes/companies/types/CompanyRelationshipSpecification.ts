import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {DbNodeType} from "../../../types/DbNodeType"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const CompanyRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.CompanyHasBrand, {
        startNodeType: DbNodeType.Company,
        endNodeType: DbNodeType.Brand,
        relationshipName: RelationshipTypeNeo4j.CompanyHasBrand,
        isReverseRelationship: false,
    }],
    [RelationshipType.CompanyHasImage, {
        startNodeType: DbNodeType.Company,
        endNodeType: DbNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.CompanyHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.CompanyHasPrimeImage, {
        startNodeType: DbNodeType.Company,
        endNodeType: DbNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.CompanyHasPrimeImage,
        isReverseRelationship: false,
    }],
]
