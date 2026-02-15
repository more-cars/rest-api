import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {DbRelationship} from "../../../types/DbRelationship"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {DbRelationshipName} from "../../../types/DbRelationshipName"

export const CompanyRelationshipSpecification: RelationshipSpecification[] = [
    [DbRelationship.CompanyHasBrand, {
        startNodeLabel: NodeTypeLabel.Company,
        endNodeLabel: NodeTypeLabel.Brand,
        relationshipName: DbRelationshipName.CompanyHasBrand,
        isReverseRelationship: false,
    }],
    [DbRelationship.CompanyHasImage, {
        startNodeLabel: NodeTypeLabel.Company,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: DbRelationshipName.CompanyHasImage,
        isReverseRelationship: false,
    }],
    [DbRelationship.CompanyHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.Company,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: DbRelationshipName.CompanyHasPrimeImage,
        isReverseRelationship: false,
    }],
]
