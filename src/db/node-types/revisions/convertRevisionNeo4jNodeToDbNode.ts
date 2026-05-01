import type {Node} from "neo4j-driver"
import type {RevisionNode} from "./types/RevisionNode"
import {DbNodeType} from "../../types/DbNodeType"

export function convertRevisionNeo4jNodeToDbNode(neo4jNode: Node): RevisionNode {
    const dbNode = {
        node_type: DbNodeType.Revision,
        properties: neo4jNode.properties
    }

    dbNode.properties.id = neo4jNode.properties.mc_id
    delete dbNode.properties.mc_id

    return dbNode as RevisionNode
}
