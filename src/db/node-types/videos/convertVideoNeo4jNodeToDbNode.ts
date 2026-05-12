import {Node} from "neo4j-driver"
import {VideoNode} from "./types/VideoNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertNeo4jPropertiesToDbProperties} from "../../nodes/convertNeo4jPropertiesToDbProperties"
import {NodeType} from "../../../specification/NodeType"

export function convertVideoNeo4jNodeToDbNode(neo4jNode: Node): VideoNode {
    return {
        node_type: DbNodeType.Video,
        properties: convertNeo4jPropertiesToDbProperties(neo4jNode, NodeType.Video)
    } as VideoNode
}
