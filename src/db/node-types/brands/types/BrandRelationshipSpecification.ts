import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {DbNodeType} from "../../../types/DbNodeType"

export const BrandRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.BrandBelongsToCompany, {
        startNodeType: DbNodeType.Brand,
        endNodeType: DbNodeType.Company,
        isReverseRelationship: true,
    }],
    [RelationshipType.BrandHasCarModel, {
        startNodeType: DbNodeType.Brand,
        endNodeType: DbNodeType.CarModel,
        isReverseRelationship: false,
    }],
    [RelationshipType.BrandHasImage, {
        startNodeType: DbNodeType.Brand,
        endNodeType: DbNodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.BrandHasPrimeImage, {
        startNodeType: DbNodeType.Brand,
        endNodeType: DbNodeType.Image,
        isReverseRelationship: false,
    }],
]
