import {ImageNode} from "./types/ImageNode"
import {fetchNodesFromDb} from "../fetchNodesFromDb"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToImageNode} from "./mapDbNodeToImageNode"

export async function getAllNodesOfType(): Promise<Array<ImageNode>> {
    const nodes: Array<ImageNode> = []

    const dbNodes = await fetchNodesFromDb(NodeTypeLabel.Image)
    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToImageNode(dbNode))
    })

    return nodes
}
