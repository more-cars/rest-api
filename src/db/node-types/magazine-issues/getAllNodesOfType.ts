import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {MagazineIssueNode} from "./types/MagazineIssueNode"
import {getDbQueryCollectionParams} from "../../nodes/getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../../nodes/fetchNodesFromDb"
import {DbNodeType} from "../../types/DbNodeType"
import {convertMagazineIssueNeo4jNodeToDbNode} from "./convertMagazineIssueNeo4jNodeToDbNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<MagazineIssueNode[]> {
    const nodes: MagazineIssueNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(DbNodeType.MagazineIssue, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(convertMagazineIssueNeo4jNodeToDbNode(dbNode))
    })

    return nodes
}
