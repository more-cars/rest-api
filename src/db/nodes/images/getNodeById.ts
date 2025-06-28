import {ImageNode} from "./types/ImageNode"
import {mapDbNodeToModelNode} from "./mapDbNodeToModelNode"
import {fetchNodeFromDb} from "../fetchNodeFromDb.ts"
import {NodeTypeLabel} from "../../NodeTypeLabel.ts"

export async function getNodeById(id: number): Promise<false | ImageNode> {
    const node = await fetchNodeFromDb(id, NodeTypeLabel.Image)

    if (!node) {
        return false
    }

    return mapDbNodeToModelNode(node)
}
