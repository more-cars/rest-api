import {Node} from "neo4j-driver"
import {CarModelVariantNode} from "./types/CarModelVariantNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertNeo4jPropertiesToDbProperties} from "../../nodes/convertNeo4jPropertiesToDbProperties"
import {NodeType} from "../../../specification/NodeType"

export function convertCarModelVariantNeo4jNodeToDbNode(neo4jNode: Node): CarModelVariantNode {
    return {
        node_type: DbNodeType.CarModelVariant,
        properties: convertNeo4jPropertiesToDbProperties(neo4jNode, NodeType.CarModelVariant)
    } as CarModelVariantNode
}
