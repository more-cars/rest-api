import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {NodeType} from "../NodeType"

export const CompanyRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.CompanyHasBrand, {
        startNodeType: NodeType.Company,
        endNodeType: NodeType.Brand,
        isReverseRelationship: false,
    }],
    [RelationshipType.CompanyHasImage, {
        startNodeType: NodeType.Company,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.CompanyHasPrimeImage, {
        startNodeType: NodeType.Company,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
]
