import {BrandNode} from "./types/BrandNode"
import {fetchNodeFromDb} from "../fetchNodeFromDb"
import {mapDbNodeToBrandNode} from "./mapDbNodeToBrandNode"

export async function getNodeById(id: number): Promise<false | BrandNode> {
    const node = await fetchNodeFromDb(id)

    if (!node) {
        return false
    }

    return mapDbNodeToBrandNode(node)
}
