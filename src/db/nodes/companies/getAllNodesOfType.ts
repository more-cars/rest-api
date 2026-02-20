import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {CompanyNode} from "./types/CompanyNode"
import {getDbQueryCollectionParams} from "../getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../fetchNodesFromDb"
import {Neo4jNodeType} from "../../types/Neo4jNodeType"
import {mapDbNodeToCompanyNode} from "./mapDbNodeToCompanyNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<CompanyNode[]> {
    const nodes: CompanyNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(Neo4jNodeType.Company, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToCompanyNode(dbNode))
    })

    return nodes
}
