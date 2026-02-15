import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {DbRelationship} from "../../../types/DbRelationship"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {DbRelationshipName} from "../../../types/DbRelationshipName"

export const BrandRelationshipSpecification: RelationshipSpecification[] = [
    [DbRelationship.BrandBelongsToCompany, {
        startNodeLabel: NodeTypeLabel.Brand,
        endNodeLabel: NodeTypeLabel.Company,
        relationshipName: DbRelationshipName.BrandBelongsToCompany,
        isReverseRelationship: true,
    }],
    [DbRelationship.BrandHasCarModel, {
        startNodeLabel: NodeTypeLabel.Brand,
        endNodeLabel: NodeTypeLabel.CarModel,
        relationshipName: DbRelationshipName.BrandHasCarModel,
        isReverseRelationship: false,
    }],
    [DbRelationship.BrandHasImage, {
        startNodeLabel: NodeTypeLabel.Brand,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: DbRelationshipName.BrandHasImage,
        isReverseRelationship: false,
    }],
    [DbRelationship.BrandHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.Brand,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: DbRelationshipName.BrandHasPrimeImage,
        isReverseRelationship: false,
    }],
]
