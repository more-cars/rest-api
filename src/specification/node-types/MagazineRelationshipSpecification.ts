import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {NodeType} from "../NodeType"

export const MagazineRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.MagazineHasIssue, {
        startNodeType: NodeType.Magazine,
        endNodeType: NodeType.MagazineIssue,
        isReverseRelationship: false,
    }],
    [RelationshipType.MagazineHasImage, {
        startNodeType: NodeType.Magazine,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.MagazineHasPrimeImage, {
        startNodeType: NodeType.Magazine,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.MagazineHasVideo, {
        startNodeType: NodeType.Magazine,
        endNodeType: NodeType.Video,
        isReverseRelationship: false,
    }],
    [RelationshipType.MagazineHasMainVideo, {
        startNodeType: NodeType.Magazine,
        endNodeType: NodeType.Video,
        isReverseRelationship: false,
    }],
    //
]
