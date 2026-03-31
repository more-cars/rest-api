import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {NodeType} from "../NodeType"

export const ModelCarRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.ModelCarIsScaleModelOfCarModelVariant, {
        startNodeType: NodeType.ModelCar,
        endNodeType: NodeType.CarModelVariant,
        isReverseRelationship: true,
    }],
    [RelationshipType.ModelCarMadeByModelCarBrand, {
        startNodeType: NodeType.ModelCar,
        endNodeType: NodeType.ModelCarBrand,
        isReverseRelationship: true,
    }],
    [RelationshipType.ModelCarHasImage, {
        startNodeType: NodeType.ModelCar,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.ModelCarHasPrimeImage, {
        startNodeType: NodeType.ModelCar,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.ModelCarHasVideo, {
        startNodeType: NodeType.ModelCar,
        endNodeType: NodeType.Video,
        isReverseRelationship: false,
    }],
    [RelationshipType.ModelCarHasMainVideo, {
        startNodeType: NodeType.ModelCar,
        endNodeType: NodeType.Video,
        isReverseRelationship: false,
    }],
    //
]
