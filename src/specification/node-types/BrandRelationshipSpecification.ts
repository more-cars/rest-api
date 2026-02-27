import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../../db/types/RelationshipType"
import {DbNodeType} from "../../db/types/DbNodeType"

export const BrandRelationshipSpecification: RelationshipTypeSpecification[] = [
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
