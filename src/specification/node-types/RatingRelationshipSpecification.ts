import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {NodeType} from "../NodeType"

export const RatingRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.RatingByMagazineIssue, {
        startNodeType: NodeType.Rating,
        endNodeType: NodeType.MagazineIssue,
        isReverseRelationship: false,
    }],
    [RelationshipType.RatingForCarModelVariant, {
        startNodeType: NodeType.Rating,
        endNodeType: NodeType.CarModelVariant,
        isReverseRelationship: false,
    }],
    //
]
