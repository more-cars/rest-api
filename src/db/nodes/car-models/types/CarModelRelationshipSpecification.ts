import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {DbRelationship} from "../../../types/DbRelationship"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const CarModelRelationshipSpecification: RelationshipSpecification[] = [
    [DbRelationship.CarModelBelongsToBrand, {
        startNodeLabel: NodeTypeLabel.CarModel,
        endNodeLabel: NodeTypeLabel.Brand,
        relationshipName: RelationshipTypeNeo4j.CarModelBelongsToBrand,
        isReverseRelationship: true,
    }],
    [DbRelationship.CarModelHasSuccessor, {
        startNodeLabel: NodeTypeLabel.CarModel,
        endNodeLabel: NodeTypeLabel.CarModel,
        relationshipName: RelationshipTypeNeo4j.CarModelHasSuccessor,
        isReverseRelationship: false,
    }],
    [DbRelationship.CarModelIsSuccessorOf, {
        startNodeLabel: NodeTypeLabel.CarModel,
        endNodeLabel: NodeTypeLabel.CarModel,
        relationshipName: RelationshipTypeNeo4j.CarModelIsSuccessorOf,
        isReverseRelationship: true,
    }],
    [DbRelationship.CarModelHasVariant, {
        startNodeLabel: NodeTypeLabel.CarModel,
        endNodeLabel: NodeTypeLabel.CarModelVariant,
        relationshipName: RelationshipTypeNeo4j.CarModelHasVariant,
        isReverseRelationship: false,
    }],
    [DbRelationship.CarModelHasImage, {
        startNodeLabel: NodeTypeLabel.CarModel,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.CarModelHasImage,
        isReverseRelationship: false,
    }],
    [DbRelationship.CarModelHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.CarModel,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.CarModelHasPrimeImage,
        isReverseRelationship: false,
    }],
]
