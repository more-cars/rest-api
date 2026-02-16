import {ImageNode} from "./types/ImageNode"
import {mapDbNodeToImageNode} from "./mapDbNodeToImageNode"
import {fetchNodeById} from "../fetchNodeById"

export async function getNodeById(id: number): Promise<false | ImageNode> {
    const node = await fetchNodeById(id)

    if (!node) {
        return false
    }

    return mapDbNodeToImageNode(node)
}
