import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const CompanyRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.CompanyHasBrand, {
        startNodeLabel: NodeTypeLabel.Company,
        endNodeLabel: NodeTypeLabel.Brand,
        relationshipName: RelationshipTypeNeo4j.CompanyHasBrand,
        isReverseRelationship: false,
    }],
    [RelationshipType.CompanyHasImage, {
        startNodeLabel: NodeTypeLabel.Company,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.CompanyHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.CompanyHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.Company,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.CompanyHasPrimeImage,
        isReverseRelationship: false,
    }],
]
