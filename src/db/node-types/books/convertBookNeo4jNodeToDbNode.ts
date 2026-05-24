import {Node} from "neo4j-driver"
import {BookNode} from "./types/BookNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertNeo4jPropertiesToDbProperties} from "../../nodes/convertNeo4jPropertiesToDbProperties"
import {NodeType} from "../../../specification/NodeType"

export function convertBookNeo4jNodeToDbNode(neo4jNode: Node): BookNode {
    return {
        node_type: DbNodeType.Book,
        properties: convertNeo4jPropertiesToDbProperties(neo4jNode, NodeType.Book)
    } as BookNode
}
