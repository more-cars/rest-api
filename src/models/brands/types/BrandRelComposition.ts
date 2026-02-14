import {RelationshipType} from "../../relationships/types/RelationshipType"
import {NodeType} from "../../types/NodeType"
import {RelComposition} from "../../relationships/types/RelComposition"

export const BrandRelComposition: RelComposition[] = [
    [RelationshipType.BrandBelongsToCompany, {
        startNodeType: NodeType.BRAND,
        endNodeType: NodeType.COMPANY,
        isReverseRelationship: true,
    }],
    [RelationshipType.BrandHasCarModel, {
        startNodeType: NodeType.BRAND,
        endNodeType: NodeType.CAR_MODEL,
        isReverseRelationship: false,
    }],
    [RelationshipType.BrandHasImage, {
        startNodeType: NodeType.BRAND,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
    [RelationshipType.BrandHasPrimeImage, {
        startNodeType: NodeType.BRAND,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
]
