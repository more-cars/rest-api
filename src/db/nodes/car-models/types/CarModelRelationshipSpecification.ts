import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {DbNodeType} from "../../../types/DbNodeType"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const CarModelRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.CarModelBelongsToBrand, {
        startNodeType: DbNodeType.CarModel,
        endNodeType: DbNodeType.Brand,
        relationshipName: RelationshipTypeNeo4j.CarModelBelongsToBrand,
        isReverseRelationship: true,
    }],
    [RelationshipType.CarModelHasSuccessor, {
        startNodeType: DbNodeType.CarModel,
        endNodeType: DbNodeType.CarModel,
        relationshipName: RelationshipTypeNeo4j.CarModelHasSuccessor,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelIsSuccessorOf, {
        startNodeType: DbNodeType.CarModel,
        endNodeType: DbNodeType.CarModel,
        relationshipName: RelationshipTypeNeo4j.CarModelIsSuccessorOf,
        isReverseRelationship: true,
    }],
    [RelationshipType.CarModelHasVariant, {
        startNodeType: DbNodeType.CarModel,
        endNodeType: DbNodeType.CarModelVariant,
        relationshipName: RelationshipTypeNeo4j.CarModelHasVariant,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelHasImage, {
        startNodeType: DbNodeType.CarModel,
        endNodeType: DbNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.CarModelHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelHasPrimeImage, {
        startNodeType: DbNodeType.CarModel,
        endNodeType: DbNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.CarModelHasPrimeImage,
        isReverseRelationship: false,
    }],
]
