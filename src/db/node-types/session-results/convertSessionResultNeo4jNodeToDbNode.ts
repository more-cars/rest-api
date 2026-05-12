import {Node} from "neo4j-driver"
import {SessionResultNode} from "./types/SessionResultNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertNeo4jPropertiesToDbProperties} from "../../nodes/convertNeo4jPropertiesToDbProperties"
import {NodeType} from "../../../specification/NodeType"

export function convertSessionResultNeo4jNodeToDbNode(neo4jNode: Node): SessionResultNode {
    return {
        node_type: DbNodeType.SessionResult,
        properties: convertNeo4jPropertiesToDbProperties(neo4jNode, NodeType.SessionResult)
    } as SessionResultNode
}
