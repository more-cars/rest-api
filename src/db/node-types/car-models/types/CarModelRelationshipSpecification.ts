import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {DbNodeType} from "../../../types/DbNodeType"

export const CarModelRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.CarModelBelongsToBrand, {
        startNodeType: DbNodeType.CarModel,
        endNodeType: DbNodeType.Brand,
        isReverseRelationship: true,
    }],
    [RelationshipType.CarModelHasSuccessor, {
        startNodeType: DbNodeType.CarModel,
        endNodeType: DbNodeType.CarModel,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelIsSuccessorOf, {
        startNodeType: DbNodeType.CarModel,
        endNodeType: DbNodeType.CarModel,
        isReverseRelationship: true,
    }],
    [RelationshipType.CarModelHasVariant, {
        startNodeType: DbNodeType.CarModel,
        endNodeType: DbNodeType.CarModelVariant,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelHasImage, {
        startNodeType: DbNodeType.CarModel,
        endNodeType: DbNodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelHasPrimeImage, {
        startNodeType: DbNodeType.CarModel,
        endNodeType: DbNodeType.Image,
        isReverseRelationship: false,
    }],
]
