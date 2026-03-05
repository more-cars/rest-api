import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {NodeType} from "../NodeType"

export const MagazineIssueRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.MagazineIssueBelongsToMagazine, {
        startNodeType: NodeType.MagazineIssue,
        endNodeType: NodeType.Magazine,
        isReverseRelationship: true,
    }],
    [RelationshipType.MagazineIssueFollowedByIssue, {
        startNodeType: NodeType.MagazineIssue,
        endNodeType: NodeType.MagazineIssue,
        isReverseRelationship: false,
    }],
    [RelationshipType.MagazineIssueHasImage, {
        startNodeType: NodeType.MagazineIssue,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.MagazineIssueHasPrimeImage, {
        startNodeType: NodeType.MagazineIssue,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
    //
]
