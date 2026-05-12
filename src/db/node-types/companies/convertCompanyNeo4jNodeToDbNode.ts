import {Node} from "neo4j-driver"
import {CompanyNode} from "./types/CompanyNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertNeo4jPropertiesToDbProperties} from "../../nodes/convertNeo4jPropertiesToDbProperties"
import {NodeType} from "../../../specification/NodeType"

export function convertCompanyNeo4jNodeToDbNode(neo4jNode: Node): CompanyNode {
    return {
        node_type: DbNodeType.Company,
        properties: convertNeo4jPropertiesToDbProperties(neo4jNode, NodeType.Company)
    } as CompanyNode
}
