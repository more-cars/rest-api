import {SessionResultNode} from "./types/SessionResultNode"
import {fetchNodeById} from "../fetchNodeById"
import {mapDbNodeToSessionResultNode} from "./mapDbNodeToSessionResultNode"

export async function getNodeById(id: number): Promise<false | SessionResultNode> {
    const node = await fetchNodeById(id)

    if (!node) {
        return false
    }

    return mapDbNodeToSessionResultNode(node)
}
