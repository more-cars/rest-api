import {Node} from "neo4j-driver"
import {RacingSessionNode} from "./types/RacingSessionNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertNeo4jPropertiesToDbProperties} from "../../nodes/convertNeo4jPropertiesToDbProperties"
import {NodeType} from "../../../specification/NodeType"

export function convertRacingSessionNeo4jNodeToDbNode(neo4jNode: Node): RacingSessionNode {
    return {
        node_type: DbNodeType.RacingSession,
        properties: convertNeo4jPropertiesToDbProperties(neo4jNode, NodeType.RacingSession)
    } as RacingSessionNode
}
