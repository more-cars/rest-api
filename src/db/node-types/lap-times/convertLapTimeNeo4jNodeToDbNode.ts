import {Node} from "neo4j-driver"
import {LapTimeNode} from "./types/LapTimeNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertNeo4jPropertiesToDbProperties} from "../../nodes/convertNeo4jPropertiesToDbProperties"
import {NodeType} from "../../../specification/NodeType"

export function convertLapTimeNeo4jNodeToDbNode(neo4jNode: Node): LapTimeNode {
    return {
        node_type: DbNodeType.LapTime,
        properties: convertNeo4jPropertiesToDbProperties(neo4jNode, NodeType.LapTime)
    } as LapTimeNode
}
