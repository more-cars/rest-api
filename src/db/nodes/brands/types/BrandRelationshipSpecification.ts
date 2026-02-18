import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {DbRelationship} from "../../../types/DbRelationship"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const BrandRelationshipSpecification: RelationshipSpecification[] = [
    [DbRelationship.BrandBelongsToCompany, {
        startNodeLabel: NodeTypeLabel.Brand,
        endNodeLabel: NodeTypeLabel.Company,
        relationshipName: RelationshipTypeNeo4j.BrandBelongsToCompany,
        isReverseRelationship: true,
    }],
    [DbRelationship.BrandHasCarModel, {
        startNodeLabel: NodeTypeLabel.Brand,
        endNodeLabel: NodeTypeLabel.CarModel,
        relationshipName: RelationshipTypeNeo4j.BrandHasCarModel,
        isReverseRelationship: false,
    }],
    [DbRelationship.BrandHasImage, {
        startNodeLabel: NodeTypeLabel.Brand,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.BrandHasImage,
        isReverseRelationship: false,
    }],
    [DbRelationship.BrandHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.Brand,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.BrandHasPrimeImage,
        isReverseRelationship: false,
    }],
]
