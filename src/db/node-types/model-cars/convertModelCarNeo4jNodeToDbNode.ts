import {Node} from "neo4j-driver"
import {ModelCarNode} from "./types/ModelCarNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertNeo4jPropertiesToDbProperties} from "../../nodes/convertNeo4jPropertiesToDbProperties"
import {NodeType} from "../../../specification/NodeType"

export function convertModelCarNeo4jNodeToDbNode(neo4jNode: Node): ModelCarNode {
    return {
        node_type: DbNodeType.ModelCar,
        properties: convertNeo4jPropertiesToDbProperties(neo4jNode, NodeType.ModelCar)
    } as ModelCarNode
}
