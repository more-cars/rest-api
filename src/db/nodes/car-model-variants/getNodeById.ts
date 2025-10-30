import {CarModelVariantNode} from "./types/CarModelVariantNode"
import {fetchNodeFromDb} from "../fetchNodeFromDb"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToCarModelVariantNode} from "./mapDbNodeToCarModelVariantNode"

export async function getNodeById(id: number): Promise<false | CarModelVariantNode> {
    const node = await fetchNodeFromDb(id, NodeTypeLabel.CarModelVariant)

    if (!node) {
        return false
    }

    return mapDbNodeToCarModelVariantNode(node)
}
