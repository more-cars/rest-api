import {Node} from "neo4j-driver"
import {ImageNode} from "./types/ImageNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertNeo4jPropertiesToDbProperties} from "../../nodes/convertNeo4jPropertiesToDbProperties"
import {NodeType} from "../../../specification/NodeType"

export function convertImageNeo4jNodeToDbNode(neo4jNode: Node): ImageNode {
    return {
        node_type: DbNodeType.Image,
        properties: convertNeo4jPropertiesToDbProperties(neo4jNode, NodeType.Image)
    } as ImageNode
}
