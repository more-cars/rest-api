import {Node} from "neo4j-driver"
import {RatingNode} from "./types/RatingNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertNeo4jPropertiesToDbProperties} from "../../nodes/convertNeo4jPropertiesToDbProperties"
import {NodeType} from "../../../specification/NodeType"

export function convertRatingNeo4jNodeToDbNode(neo4jNode: Node): RatingNode {
    return {
        node_type: DbNodeType.Rating,
        properties: convertNeo4jPropertiesToDbProperties(neo4jNode, NodeType.Rating)
    } as RatingNode
}
