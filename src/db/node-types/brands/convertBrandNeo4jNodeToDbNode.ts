import {Node} from "neo4j-driver"
import {BrandNode} from "./types/BrandNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertNeo4jPropertiesToDbProperties} from "../../nodes/convertNeo4jPropertiesToDbProperties"
import {NodeType} from "../../../specification/NodeType"

export function convertBrandNeo4jNodeToDbNode(neo4jNode: Node): BrandNode {
    return {
        node_type: DbNodeType.Brand,
        properties: convertNeo4jPropertiesToDbProperties(neo4jNode, NodeType.Brand)
    } as BrandNode
}
