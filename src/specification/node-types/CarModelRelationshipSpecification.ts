import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {DbNodeType} from "../../db/types/DbNodeType"

export const CarModelRelationshipSpecification: RelationshipTypeSpecification[] = [
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
