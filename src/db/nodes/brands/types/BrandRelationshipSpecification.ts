import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const BrandRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.BrandBelongsToCompany, {
        startNodeLabel: NodeTypeLabel.Brand,
        endNodeLabel: NodeTypeLabel.Company,
        relationshipName: RelationshipTypeNeo4j.BrandBelongsToCompany,
        isReverseRelationship: true,
    }],
    [RelationshipType.BrandHasCarModel, {
        startNodeLabel: NodeTypeLabel.Brand,
        endNodeLabel: NodeTypeLabel.CarModel,
        relationshipName: RelationshipTypeNeo4j.BrandHasCarModel,
        isReverseRelationship: false,
    }],
    [RelationshipType.BrandHasImage, {
        startNodeLabel: NodeTypeLabel.Brand,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.BrandHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.BrandHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.Brand,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.BrandHasPrimeImage,
        isReverseRelationship: false,
    }],
]
