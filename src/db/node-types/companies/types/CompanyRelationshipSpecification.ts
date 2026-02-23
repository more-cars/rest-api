import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {DbNodeType} from "../../../types/DbNodeType"

export const CompanyRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.CompanyHasBrand, {
        startNodeType: DbNodeType.Company,
        endNodeType: DbNodeType.Brand,
        isReverseRelationship: false,
    }],
    [RelationshipType.CompanyHasImage, {
        startNodeType: DbNodeType.Company,
        endNodeType: DbNodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.CompanyHasPrimeImage, {
        startNodeType: DbNodeType.Company,
        endNodeType: DbNodeType.Image,
        isReverseRelationship: false,
    }],
]
