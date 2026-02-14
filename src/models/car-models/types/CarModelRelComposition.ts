import {RelationshipType} from "../../relationships/types/RelationshipType"
import {NodeType} from "../../types/NodeType"
import {RelComposition} from "../../relationships/types/RelComposition"

export const CarModelRelComposition: RelComposition[] = [
    [RelationshipType.CarModelBelongsToBrand, {
        startNodeType: NodeType.CAR_MODEL,
        endNodeType: NodeType.BRAND,
        isReverseRelationship: true,
    }],
    [RelationshipType.CarModelHasSuccessor, {
        startNodeType: NodeType.CAR_MODEL,
        endNodeType: NodeType.CAR_MODEL,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelIsSuccessorOf, {
        startNodeType: NodeType.CAR_MODEL,
        endNodeType: NodeType.CAR_MODEL,
        isReverseRelationship: true,
    }],
    [RelationshipType.CarModelHasVariant, {
        startNodeType: NodeType.CAR_MODEL,
        endNodeType: NodeType.CAR_MODEL_VARIANT,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelHasImage, {
        startNodeType: NodeType.CAR_MODEL,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelHasPrimeImage, {
        startNodeType: NodeType.CAR_MODEL,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
]
