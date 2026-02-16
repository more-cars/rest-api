import {CarModelVariantNode} from "./types/CarModelVariantNode"
import {fetchNodeFromDb} from "../fetchNodeFromDb"
import {mapDbNodeToCarModelVariantNode} from "./mapDbNodeToCarModelVariantNode"

export async function getNodeById(id: number): Promise<false | CarModelVariantNode> {
    const node = await fetchNodeFromDb(id)

    if (!node) {
        return false
    }

    return mapDbNodeToCarModelVariantNode(node)
}
