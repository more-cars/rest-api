import {Node} from "neo4j-driver"
import {PriceNode} from "./types/PriceNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertNeo4jPropertiesToDbProperties} from "../../nodes/convertNeo4jPropertiesToDbProperties"
import {NodeType} from "../../../specification/NodeType"

export function convertPriceNeo4jNodeToDbNode(neo4jNode: Node): PriceNode {
    return {
        node_type: DbNodeType.Price,
        properties: convertNeo4jPropertiesToDbProperties(neo4jNode, NodeType.Price)
    } as PriceNode
}
