import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import {ImageNode} from "./types/ImageNode"
import {getDbQueryCollectionParams} from "../getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../fetchNodesFromDb"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToImageNode} from "./mapDbNodeToImageNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<ImageNode[]> {
    const nodes: ImageNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(NodeTypeLabel.Image, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToImageNode(dbNode))
    })

    return nodes
}
