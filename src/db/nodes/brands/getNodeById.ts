import {BrandNode} from "./types/BrandNode"
import {fetchNodeFromDb} from "../fetchNodeFromDb.ts"
import {NodeTypeLabel} from "../../NodeTypeLabel.ts"
import {mapDbNodeToBrandNode} from "./mapDbNodeToBrandNode.ts"

export async function getNodeById(id: number): Promise<false | BrandNode> {
    const node = await fetchNodeFromDb(id, NodeTypeLabel.Brand)

    if (!node) {
        return false
    }

    return mapDbNodeToBrandNode(node)
}
