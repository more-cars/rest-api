import {BrandNode} from "./types/BrandNode"
import {fetchNodeById} from "../fetchNodeById"
import {mapDbNodeToBrandNode} from "./mapDbNodeToBrandNode"

export async function getNodeById(id: number): Promise<false | BrandNode> {
    const node = await fetchNodeById(id)

    if (!node) {
        return false
    }

    return mapDbNodeToBrandNode(node)
}
