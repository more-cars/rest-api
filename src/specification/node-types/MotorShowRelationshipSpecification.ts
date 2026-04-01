import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {NodeType} from "../NodeType"

export const MotorShowRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.MotorShowPresentsCarModelVariant, {
        startNodeType: NodeType.MotorShow,
        endNodeType: NodeType.CarModelVariant,
        isReverseRelationship: false,
    }],
    [RelationshipType.MotorShowHasImage, {
        startNodeType: NodeType.MotorShow,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.MotorShowHasPrimeImage, {
        startNodeType: NodeType.MotorShow,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.MotorShowHasVideo, {
        startNodeType: NodeType.MotorShow,
        endNodeType: NodeType.Video,
        isReverseRelationship: false,
    }],
    [RelationshipType.MotorShowHasMainVideo, {
        startNodeType: NodeType.MotorShow,
        endNodeType: NodeType.Video,
        isReverseRelationship: false,
    }],
    //
]
