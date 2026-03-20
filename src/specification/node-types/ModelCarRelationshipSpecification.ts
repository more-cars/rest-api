import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {NodeType} from "../NodeType"

export const ModelCarRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.ModelCarIsScaleModelOfCarModelVariant, {
        startNodeType: NodeType.ModelCar,
        endNodeType: NodeType.CarModelVariant,
        isReverseRelationship: false,
    }],
    [RelationshipType.ModelCarMadeByModelCarBrand, {
        startNodeType: NodeType.ModelCar,
        endNodeType: NodeType.ModelCarBrand,
        isReverseRelationship: true,
    }],
    //
]
