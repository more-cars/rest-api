import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"

export const RatingRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.RatingByMagazineIssue, {
        startNodeType: NodeType.Rating,
        endNodeType: NodeType.MagazineIssue,
        isReverseRelationship: false,
    }],
    //
]
