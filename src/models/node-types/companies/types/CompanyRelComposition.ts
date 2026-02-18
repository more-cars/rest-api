import {RelType} from "../../../relationships/types/RelType"
import {NodeType} from "../../../types/NodeType"
import {RelComposition} from "../../../relationships/types/RelComposition"

export const CompanyRelComposition: RelComposition[] = [
    [RelType.CompanyHasBrand, {
        startNodeType: NodeType.COMPANY,
        endNodeType: NodeType.BRAND,
        isReverseRelationship: false,
    }],
    [RelType.CompanyHasImage, {
        startNodeType: NodeType.COMPANY,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
    [RelType.CompanyHasPrimeImage, {
        startNodeType: NodeType.COMPANY,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
]
