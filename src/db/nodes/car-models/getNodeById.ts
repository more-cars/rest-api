import {CarModelNode} from "./types/CarModelNode"
import {fetchNodeFromDb} from "../fetchNodeFromDb"
import {mapDbNodeToCarModelNode} from "./mapDbNodeToCarModelNode"

export async function getNodeById(id: number): Promise<false | CarModelNode> {
    const node = await fetchNodeFromDb(id)

    if (!node) {
        return false
    }

    return mapDbNodeToCarModelNode(node)
}
