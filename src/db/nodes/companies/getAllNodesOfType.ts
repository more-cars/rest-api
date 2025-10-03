import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {CompanyNode} from "./types/CompanyNode"
import {getDbQueryCollectionParams} from "../getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../fetchNodesFromDb"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToCompanyNode} from "./mapDbNodeToCompanyNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<Array<CompanyNode>> {
    const nodes: Array<CompanyNode> = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(NodeTypeLabel.Company, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToCompanyNode(dbNode))
    })

    return nodes
}
