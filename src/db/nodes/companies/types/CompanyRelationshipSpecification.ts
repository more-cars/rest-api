import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {DbRelationship} from "../../../types/DbRelationship"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const CompanyRelationshipSpecification: RelationshipSpecification[] = [
    [DbRelationship.CompanyHasBrand, {
        startNodeLabel: NodeTypeLabel.Company,
        endNodeLabel: NodeTypeLabel.Brand,
        relationshipName: RelationshipTypeNeo4j.CompanyHasBrand,
        isReverseRelationship: false,
    }],
    [DbRelationship.CompanyHasImage, {
        startNodeLabel: NodeTypeLabel.Company,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.CompanyHasImage,
        isReverseRelationship: false,
    }],
    [DbRelationship.CompanyHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.Company,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.CompanyHasPrimeImage,
        isReverseRelationship: false,
    }],
]
