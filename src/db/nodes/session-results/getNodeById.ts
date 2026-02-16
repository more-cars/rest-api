import {SessionResultNode} from "./types/SessionResultNode"
import {fetchNodeFromDb} from "../fetchNodeFromDb"
import {mapDbNodeToSessionResultNode} from "./mapDbNodeToSessionResultNode"

export async function getNodeById(id: number): Promise<false | SessionResultNode> {
    const node = await fetchNodeFromDb(id)

    if (!node) {
        return false
    }

    return mapDbNodeToSessionResultNode(node)
}
