import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {NodeType} from "../NodeType"

export const VideoRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.NodeHasVideo, {
        startNodeType: NodeType.Node,
        endNodeType: NodeType.Video,
        isReverseRelationship: false,
    }],
    [RelationshipType.NodeHasMainVideo, {
        startNodeType: NodeType.Node,
        endNodeType: NodeType.Video,
        isReverseRelationship: false,
    }],
    [RelationshipType.VideoBelongsToNode, {
        startNodeType: NodeType.Video,
        endNodeType: NodeType.Node,
        isReverseRelationship: true,
    }],
    [RelationshipType.VideoIsMainVideoOfNode, {
        startNodeType: NodeType.Video,
        endNodeType: NodeType.Node,
        isReverseRelationship: true,
    }],
    //
]
