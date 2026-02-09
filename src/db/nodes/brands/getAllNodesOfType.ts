import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import {BrandNode} from "./types/BrandNode"
import {getDbQueryCollectionParams} from "../getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../fetchNodesFromDb"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToBrandNode} from "./mapDbNodeToBrandNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<BrandNode[]> {
    const nodes: BrandNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(NodeTypeLabel.Brand, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToBrandNode(dbNode))
    })

    return nodes
}
