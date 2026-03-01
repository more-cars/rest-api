import {Node} from "neo4j-driver"
import {MagazineIssueNode} from "./types/MagazineIssueNode"
import {DbNodeType} from "../../types/DbNodeType"

export function convertMagazineIssueNeo4jNodeToDbNode(neo4jNode: Node): MagazineIssueNode {
    return {
        node_type: DbNodeType.MagazineIssue,
        properties: {
            // system data
            id: neo4jNode.properties.mc_id,
            created_at: neo4jNode.properties.created_at,
            updated_at: neo4jNode.properties.updated_at,
    
            // user data
            title: neo4jNode.properties.title,
            consecutive_number: neo4jNode.properties.consecutive_number,
            issue_number: neo4jNode.properties.issue_number,
            issue_year: neo4jNode.properties.issue_year,
            release_date: neo4jNode.properties.release_date,
            single_copy_price: neo4jNode.properties.single_copy_price,
            single_copy_price_unit: neo4jNode.properties.single_copy_price_unit,
            pages: neo4jNode.properties.pages,
        },
    } satisfies MagazineIssueNode
}
