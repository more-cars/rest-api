import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import {BrandNode} from "./types/BrandNode"
import {getDbQueryPaginationParams} from "../getDbQueryPaginationParams"
import {fetchNodesFromDb} from "../fetchNodesFromDb"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToBrandNode} from "./mapDbNodeToBrandNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {page: 1}): Promise<Array<BrandNode>> {
    const nodes: Array<BrandNode> = []
    const dbParams = getDbQueryPaginationParams(constraints)
    const dbNodes = await fetchNodesFromDb(NodeTypeLabel.Brand, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToBrandNode(dbNode))
    })

    return nodes
}
