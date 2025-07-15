import {CarModelNode} from "./types/CarModelNode"
import {fetchNodeFromDb} from "../fetchNodeFromDb"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToCarModelNode} from "./mapDbNodeToCarModelNode"

export async function getNodeById(id: number): Promise<false | CarModelNode> {
    const node = await fetchNodeFromDb(id, NodeTypeLabel.CarModel)

    if (!node) {
        return false
    }

    return mapDbNodeToCarModelNode(node)
}
