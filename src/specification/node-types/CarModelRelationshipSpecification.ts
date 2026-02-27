import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {NodeType} from "../NodeType"

export const CarModelRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.CarModelBelongsToBrand, {
        startNodeType: NodeType.CarModel,
        endNodeType: NodeType.Brand,
        isReverseRelationship: true,
    }],
    [RelationshipType.CarModelHasSuccessor, {
        startNodeType: NodeType.CarModel,
        endNodeType: NodeType.CarModel,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelIsSuccessorOf, {
        startNodeType: NodeType.CarModel,
        endNodeType: NodeType.CarModel,
        isReverseRelationship: true,
    }],
    [RelationshipType.CarModelHasVariant, {
        startNodeType: NodeType.CarModel,
        endNodeType: NodeType.CarModelVariant,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelHasImage, {
        startNodeType: NodeType.CarModel,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelHasPrimeImage, {
        startNodeType: NodeType.CarModel,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
]
