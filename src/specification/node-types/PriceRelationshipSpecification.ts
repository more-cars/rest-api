import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {NodeType} from "../NodeType"

export const PriceRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.PriceForCarModelVariant, {
        startNodeType: NodeType.Price,
        endNodeType: NodeType.CarModelVariant,
        isReverseRelationship: false,
    }],
    [RelationshipType.PriceHasImage, {
        startNodeType: NodeType.Price,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.PriceHasPrimeImage, {
        startNodeType: NodeType.Price,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
    //
]
