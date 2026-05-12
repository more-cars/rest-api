import {Node} from "neo4j-driver"
import {MagazineIssueNode} from "./types/MagazineIssueNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertNeo4jPropertiesToDbProperties} from "../../nodes/convertNeo4jPropertiesToDbProperties"
import {NodeType} from "../../../specification/NodeType"

export function convertMagazineIssueNeo4jNodeToDbNode(neo4jNode: Node): MagazineIssueNode {
    return {
        node_type: DbNodeType.MagazineIssue,
        properties: convertNeo4jPropertiesToDbProperties(neo4jNode, NodeType.MagazineIssue)
    } as MagazineIssueNode
}
