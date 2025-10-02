import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {CompanyNode} from "./types/CompanyNode"
import {getDbQueryPaginationParams} from "../getDbQueryPaginationParams"
import {fetchNodesFromDb} from "../fetchNodesFromDb"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToCompanyNode} from "./mapDbNodeToCompanyNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {page: 1}): Promise<Array<CompanyNode>> {
    const nodes: Array<CompanyNode> = []
    const dbParams = getDbQueryPaginationParams(constraints)
    const dbNodes = await fetchNodesFromDb(NodeTypeLabel.Company, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToCompanyNode(dbNode))
    })

    return nodes
}
