import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {NodeType} from "../NodeType"

export const ModelCarBrandRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.ModelCarBrandCreatedModelCar, {
        startNodeType: NodeType.ModelCarBrand,
        endNodeType: NodeType.ModelCar,
        isReverseRelationship: false,
    }],
    //
]
