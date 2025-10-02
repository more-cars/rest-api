import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import {ImageNode} from "./types/ImageNode"
import {getDbQueryPaginationParams} from "../getDbQueryPaginationParams"
import {fetchNodesFromDb} from "../fetchNodesFromDb"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToImageNode} from "./mapDbNodeToImageNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {page: 1}): Promise<Array<ImageNode>> {
    const nodes: Array<ImageNode> = []
    const dbParams = getDbQueryPaginationParams(constraints)
    const dbNodes = await fetchNodesFromDb(NodeTypeLabel.Image, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToImageNode(dbNode))
    })

    return nodes
}
