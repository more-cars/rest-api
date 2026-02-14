import {RelationshipType} from "../../relationships/types/RelationshipType"
import {NodeType} from "../../types/NodeType"
import {RelComposition} from "../../relationships/types/RelComposition"

export const CompanyRelComposition: RelComposition[] = [
    [RelationshipType.CompanyHasBrand, {
        startNodeType: NodeType.COMPANY,
        endNodeType: NodeType.BRAND,
        isReverseRelationship: false,
    }],
    [RelationshipType.CompanyHasImage, {
        startNodeType: NodeType.COMPANY,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
    [RelationshipType.CompanyHasPrimeImage, {
        startNodeType: NodeType.COMPANY,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
]
