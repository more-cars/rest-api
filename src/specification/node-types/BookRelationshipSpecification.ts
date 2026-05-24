import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {NodeType} from "../NodeType"

export const BookRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.BookCoversCarModelVariant, {
        startNodeType: NodeType.Book,
        endNodeType: NodeType.CarModelVariant,
        isReverseRelationship: false,
    }],
    [RelationshipType.BookHasVideo, {
        startNodeType: NodeType.Book,
        endNodeType: NodeType.Video,
        isReverseRelationship: false,
    }],
    [RelationshipType.BookHasMainVideo, {
        startNodeType: NodeType.Book,
        endNodeType: NodeType.Video,
        isReverseRelationship: false,
    }],
    //
]
