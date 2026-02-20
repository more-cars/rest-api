import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {DbNodeType} from "../../../types/DbNodeType"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const BrandRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.BrandBelongsToCompany, {
        startNodeType: DbNodeType.Brand,
        endNodeType: DbNodeType.Company,
        relationshipName: RelationshipTypeNeo4j.BrandBelongsToCompany,
        isReverseRelationship: true,
    }],
    [RelationshipType.BrandHasCarModel, {
        startNodeType: DbNodeType.Brand,
        endNodeType: DbNodeType.CarModel,
        relationshipName: RelationshipTypeNeo4j.BrandHasCarModel,
        isReverseRelationship: false,
    }],
    [RelationshipType.BrandHasImage, {
        startNodeType: DbNodeType.Brand,
        endNodeType: DbNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.BrandHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.BrandHasPrimeImage, {
        startNodeType: DbNodeType.Brand,
        endNodeType: DbNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.BrandHasPrimeImage,
        isReverseRelationship: false,
    }],
]
