import {Node} from "neo4j-driver"
import {CarModelNode} from "./types/CarModelNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertNeo4jPropertiesToDbProperties} from "../../nodes/convertNeo4jPropertiesToDbProperties"
import {NodeType} from "../../../specification/NodeType"

export function convertCarModelNeo4jNodeToDbNode(neo4jNode: Node): CarModelNode {
    return {
        node_type: DbNodeType.CarModel,
        properties: convertNeo4jPropertiesToDbProperties(neo4jNode, NodeType.CarModel)
    } as CarModelNode
}
