import {CarModelVariantNode} from "./types/CarModelVariantNode"
import {fetchNodeById} from "../fetchNodeById"
import {mapDbNodeToCarModelVariantNode} from "./mapDbNodeToCarModelVariantNode"

export async function getNodeById(id: number): Promise<false | CarModelVariantNode> {
    const node = await fetchNodeById(id)

    if (!node) {
        return false
    }

    return mapDbNodeToCarModelVariantNode(node)
}
