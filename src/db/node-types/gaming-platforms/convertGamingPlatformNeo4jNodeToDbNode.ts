import {Node} from "neo4j-driver"
import {GamingPlatformNode} from "./types/GamingPlatformNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertNeo4jPropertiesToDbProperties} from "../../nodes/convertNeo4jPropertiesToDbProperties"
import {NodeType} from "../../../specification/NodeType"

export function convertGamingPlatformNeo4jNodeToDbNode(neo4jNode: Node): GamingPlatformNode {
    return {
        node_type: DbNodeType.GamingPlatform,
        properties: convertNeo4jPropertiesToDbProperties(neo4jNode, NodeType.GamingPlatform)
    } as GamingPlatformNode
}
