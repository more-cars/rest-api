import {ImageNode} from "./types/ImageNode"
import {mapDbNodeToImageNode} from "./mapDbNodeToImageNode"
import {fetchNodeFromDb} from "../fetchNodeFromDb"

export async function getNodeById(id: number): Promise<false | ImageNode> {
    const node = await fetchNodeFromDb(id)

    if (!node) {
        return false
    }

    return mapDbNodeToImageNode(node)
}
