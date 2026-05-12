import {Node} from "neo4j-driver"
import {RacingSeriesNode} from "./types/RacingSeriesNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertNeo4jPropertiesToDbProperties} from "../../nodes/convertNeo4jPropertiesToDbProperties"
import {NodeType} from "../../../specification/NodeType"

export function convertRacingSeriesNeo4jNodeToDbNode(neo4jNode: Node): RacingSeriesNode {
    return {
        node_type: DbNodeType.RacingSeries,
        properties: convertNeo4jPropertiesToDbProperties(neo4jNode, NodeType.RacingSeries)
    } as RacingSeriesNode
}
