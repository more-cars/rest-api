import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {NodeType} from "../NodeType"

export const BrandRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.BrandBelongsToCompany, {
        startNodeType: NodeType.Brand,
        endNodeType: NodeType.Company,
        isReverseRelationship: true,
    }],
    [RelationshipType.BrandHasCarModel, {
        startNodeType: NodeType.Brand,
        endNodeType: NodeType.CarModel,
        isReverseRelationship: false,
    }],
    [RelationshipType.BrandHasImage, {
        startNodeType: NodeType.Brand,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.BrandHasPrimeImage, {
        startNodeType: NodeType.Brand,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
]
