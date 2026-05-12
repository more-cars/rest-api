import {Node} from "neo4j-driver"
import {ProgrammeNode} from "./types/ProgrammeNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertNeo4jPropertiesToDbProperties} from "../../nodes/convertNeo4jPropertiesToDbProperties"
import {NodeType} from "../../../specification/NodeType"

export function convertProgrammeNeo4jNodeToDbNode(neo4jNode: Node): ProgrammeNode {
    return {
        node_type: DbNodeType.Programme,
        properties: convertNeo4jPropertiesToDbProperties(neo4jNode, NodeType.Programme)
    } as ProgrammeNode
}
