import {BrandNode} from "./types/BrandNode"
import {fetchNodeFromDb} from "../fetchNodeFromDb"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToBrandNode} from "./mapDbNodeToBrandNode"

export async function getNodeById(id: number): Promise<false | BrandNode> {
    const node = await fetchNodeFromDb(id, NodeTypeLabel.Brand)

    if (!node) {
        return false
    }

    return mapDbNodeToBrandNode(node)
}
