import {Node} from "neo4j-driver"
import {RacingEventNode} from "./types/RacingEventNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertNeo4jPropertiesToDbProperties} from "../../nodes/convertNeo4jPropertiesToDbProperties"
import {NodeType} from "../../../specification/NodeType"

export function convertRacingEventNeo4jNodeToDbNode(neo4jNode: Node): RacingEventNode {
    return {
        node_type: DbNodeType.RacingEvent,
        properties: convertNeo4jPropertiesToDbProperties(neo4jNode, NodeType.RacingEvent)
    } as RacingEventNode
}

