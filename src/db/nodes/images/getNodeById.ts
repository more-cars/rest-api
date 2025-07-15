import {ImageNode} from "./types/ImageNode"
import {mapDbNodeToImageNode} from "./mapDbNodeToImageNode"
import {fetchNodeFromDb} from "../fetchNodeFromDb"
import {NodeTypeLabel} from "../../NodeTypeLabel"

export async function getNodeById(id: number): Promise<false | ImageNode> {
    const node = await fetchNodeFromDb(id, NodeTypeLabel.Image)

    if (!node) {
        return false
    }

    return mapDbNodeToImageNode(node)
}
