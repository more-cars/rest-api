import {Node} from "neo4j-driver"
import {RacingGameNode} from "./types/RacingGameNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertNeo4jPropertiesToDbProperties} from "../../nodes/convertNeo4jPropertiesToDbProperties"
import {NodeType} from "../../../specification/NodeType"

export function convertRacingGameNeo4jNodeToDbNode(neo4jNode: Node): RacingGameNode {
    return {
        node_type: DbNodeType.RacingGame,
        properties: convertNeo4jPropertiesToDbProperties(neo4jNode, NodeType.RacingGame)
    } as RacingGameNode
}
