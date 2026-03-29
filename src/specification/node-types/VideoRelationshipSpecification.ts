import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {NodeType} from "../NodeType"

export const VideoRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.VideoBelongsToNode, {
        startNodeType: NodeType.Video,
        endNodeType: NodeType.Node,
        isReverseRelationship: true,
    }],
    //
]
