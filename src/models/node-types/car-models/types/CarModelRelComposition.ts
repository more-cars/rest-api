import {RelType} from "../../../relationships/types/RelType"
import {NodeType} from "../../../types/NodeType"
import {RelComposition} from "../../../relationships/types/RelComposition"

export const CarModelRelComposition: RelComposition[] = [
    [RelType.CarModelBelongsToBrand, {
        startNodeType: NodeType.CAR_MODEL,
        endNodeType: NodeType.BRAND,
        isReverseRelationship: true,
    }],
    [RelType.CarModelHasSuccessor, {
        startNodeType: NodeType.CAR_MODEL,
        endNodeType: NodeType.CAR_MODEL,
        isReverseRelationship: false,
    }],
    [RelType.CarModelIsSuccessorOf, {
        startNodeType: NodeType.CAR_MODEL,
        endNodeType: NodeType.CAR_MODEL,
        isReverseRelationship: true,
    }],
    [RelType.CarModelHasVariant, {
        startNodeType: NodeType.CAR_MODEL,
        endNodeType: NodeType.CAR_MODEL_VARIANT,
        isReverseRelationship: false,
    }],
    [RelType.CarModelHasImage, {
        startNodeType: NodeType.CAR_MODEL,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
    [RelType.CarModelHasPrimeImage, {
        startNodeType: NodeType.CAR_MODEL,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
]
