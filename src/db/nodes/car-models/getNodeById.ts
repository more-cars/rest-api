import {CarModelNode} from "./types/CarModelNode"
import {fetchNodeById} from "../fetchNodeById"
import {mapDbNodeToCarModelNode} from "./mapDbNodeToCarModelNode"

export async function getNodeById(id: number): Promise<false | CarModelNode> {
    const node = await fetchNodeById(id)

    if (!node) {
        return false
    }

    return mapDbNodeToCarModelNode(node)
}
