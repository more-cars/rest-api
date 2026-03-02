import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {NodeType} from "../NodeType"

export const MagazineIssueRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.MagazineIssueBelongsToMagazine, {
        startNodeType: NodeType.MagazineIssue,
        endNodeType: NodeType.Magazine,
        isReverseRelationship: true,
    }],
    //
]
