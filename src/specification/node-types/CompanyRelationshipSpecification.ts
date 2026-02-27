import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {DbNodeType} from "../../db/types/DbNodeType"

export const CompanyRelationshipSpecification: RelationshipTypeSpecification[] = [
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
