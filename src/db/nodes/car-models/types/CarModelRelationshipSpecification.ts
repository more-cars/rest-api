import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {DbRelationship} from "../../../types/DbRelationship"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {DbRelationshipName} from "../../../types/DbRelationshipName"

export const CarModelRelationshipSpecification: RelationshipSpecification[] = [
    [DbRelationship.CarModelBelongsToBrand, {
        startNodeLabel: NodeTypeLabel.CarModel,
        endNodeLabel: NodeTypeLabel.Brand,
        relationshipName: DbRelationshipName.CarModelBelongsToBrand,
        isReverseRelationship: true,
    }],
    [DbRelationship.CarModelHasSuccessor, {
        startNodeLabel: NodeTypeLabel.CarModel,
        endNodeLabel: NodeTypeLabel.CarModel,
        relationshipName: DbRelationshipName.CarModelHasSuccessor,
        isReverseRelationship: false,
    }],
    [DbRelationship.CarModelIsSuccessorOf, {
        startNodeLabel: NodeTypeLabel.CarModel,
        endNodeLabel: NodeTypeLabel.CarModel,
        relationshipName: DbRelationshipName.CarModelIsSuccessorOf,
        isReverseRelationship: true,
    }],
    [DbRelationship.CarModelHasVariant, {
        startNodeLabel: NodeTypeLabel.CarModel,
        endNodeLabel: NodeTypeLabel.CarModelVariant,
        relationshipName: DbRelationshipName.CarModelHasVariant,
        isReverseRelationship: false,
    }],
    [DbRelationship.CarModelHasImage, {
        startNodeLabel: NodeTypeLabel.CarModel,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: DbRelationshipName.CarModelHasImage,
        isReverseRelationship: false,
    }],
    [DbRelationship.CarModelHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.CarModel,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: DbRelationshipName.CarModelHasPrimeImage,
        isReverseRelationship: false,
    }],
]
