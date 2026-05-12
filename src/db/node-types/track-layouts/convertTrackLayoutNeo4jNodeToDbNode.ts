import {Node} from "neo4j-driver"
import {TrackLayoutNode} from "./types/TrackLayoutNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertNeo4jPropertiesToDbProperties} from "../../nodes/convertNeo4jPropertiesToDbProperties"
import {NodeType} from "../../../specification/NodeType"

export function convertTrackLayoutNeo4jNodeToDbNode(neo4jNode: Node): TrackLayoutNode {
    return {
        node_type: DbNodeType.TrackLayout,
        properties: convertNeo4jPropertiesToDbProperties(neo4jNode, NodeType.TrackLayout)
    } as TrackLayoutNode
}
