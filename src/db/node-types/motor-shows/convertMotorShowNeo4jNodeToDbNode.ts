import {Node} from "neo4j-driver"
import {MotorShowNode} from "./types/MotorShowNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertNeo4jPropertiesToDbProperties} from "../../nodes/convertNeo4jPropertiesToDbProperties"
import {NodeType} from "../../../specification/NodeType"

export function convertMotorShowNeo4jNodeToDbNode(neo4jNode: Node): MotorShowNode {
    return {
        node_type: DbNodeType.MotorShow,
        properties: convertNeo4jPropertiesToDbProperties(neo4jNode, NodeType.MotorShow)
    } as MotorShowNode
}
