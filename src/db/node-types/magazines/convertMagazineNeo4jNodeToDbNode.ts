import {Node} from "neo4j-driver"
import {MagazineNode} from "./types/MagazineNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertNeo4jPropertiesToDbProperties} from "../../nodes/convertNeo4jPropertiesToDbProperties"
import {NodeType} from "../../../specification/NodeType"

export function convertMagazineNeo4jNodeToDbNode(neo4jNode: Node): MagazineNode {
    return {
        node_type: DbNodeType.Magazine,
        properties: convertNeo4jPropertiesToDbProperties(neo4jNode, NodeType.Magazine)
    } as MagazineNode
}
