import {Node} from "neo4j-driver"
import {ModelCarBrandNode} from "./types/ModelCarBrandNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertNeo4jPropertiesToDbProperties} from "../../nodes/convertNeo4jPropertiesToDbProperties"
import {NodeType} from "../../../specification/NodeType"

export function convertModelCarBrandNeo4jNodeToDbNode(neo4jNode: Node): ModelCarBrandNode {
    return {
        node_type: DbNodeType.ModelCarBrand,
        properties: convertNeo4jPropertiesToDbProperties(neo4jNode, NodeType.ModelCarBrand)
    } as ModelCarBrandNode
}
