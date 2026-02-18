import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const CarModelRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.CarModelBelongsToBrand, {
        startNodeLabel: NodeTypeLabel.CarModel,
        endNodeLabel: NodeTypeLabel.Brand,
        relationshipName: RelationshipTypeNeo4j.CarModelBelongsToBrand,
        isReverseRelationship: true,
    }],
    [RelationshipType.CarModelHasSuccessor, {
        startNodeLabel: NodeTypeLabel.CarModel,
        endNodeLabel: NodeTypeLabel.CarModel,
        relationshipName: RelationshipTypeNeo4j.CarModelHasSuccessor,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelIsSuccessorOf, {
        startNodeLabel: NodeTypeLabel.CarModel,
        endNodeLabel: NodeTypeLabel.CarModel,
        relationshipName: RelationshipTypeNeo4j.CarModelIsSuccessorOf,
        isReverseRelationship: true,
    }],
    [RelationshipType.CarModelHasVariant, {
        startNodeLabel: NodeTypeLabel.CarModel,
        endNodeLabel: NodeTypeLabel.CarModelVariant,
        relationshipName: RelationshipTypeNeo4j.CarModelHasVariant,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelHasImage, {
        startNodeLabel: NodeTypeLabel.CarModel,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.CarModelHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.CarModel,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.CarModelHasPrimeImage,
        isReverseRelationship: false,
    }],
]
