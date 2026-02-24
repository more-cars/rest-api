import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {CompanyNode} from "./types/CompanyNode"
import {getDbQueryCollectionParams} from "../../nodes/getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../../nodes/fetchNodesFromDb"
import {DbNodeType} from "../../types/DbNodeType"
import {convertCompanyNeo4jNodeToDbNode} from "./convertCompanyNeo4jNodeToDbNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<CompanyNode[]> {
    const nodes: CompanyNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(DbNodeType.Company, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(convertCompanyNeo4jNodeToDbNode(dbNode))
    })

    return nodes
}
