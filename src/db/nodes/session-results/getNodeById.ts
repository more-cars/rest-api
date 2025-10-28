import {SessionResultNode} from "./types/SessionResultNode"
import {fetchNodeFromDb} from "../fetchNodeFromDb"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToSessionResultNode} from "./mapDbNodeToSessionResultNode"

export async function getNodeById(id: number): Promise<false | SessionResultNode> {
    const node = await fetchNodeFromDb(id, NodeTypeLabel.SessionResult)

    if (!node) {
        return false
    }

    return mapDbNodeToSessionResultNode(node)
}
