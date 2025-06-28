import {CarModelNode} from "./types/CarModelNode"
import {fetchNodeFromDb} from "../fetchNodeFromDb.ts"
import {NodeTypeLabel} from "../../NodeTypeLabel.ts"
import {mapDbNodeToModelNode} from "./mapDbNodeToModelNode"

export async function getNodeById(id: number): Promise<false | CarModelNode> {
    const node = await fetchNodeFromDb(id, NodeTypeLabel.CarModel)

    if (!node) {
        return false
    }

    return mapDbNodeToModelNode(node)
}
