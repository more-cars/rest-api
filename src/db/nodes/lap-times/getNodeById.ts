import {LapTimeNode} from "./types/LapTimeNode"
import {fetchNodeFromDb} from "../fetchNodeFromDb"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToLapTimeNode} from "./mapDbNodeToLapTimeNode"

export async function getNodeById(id: number): Promise<false | LapTimeNode> {
    const node = await fetchNodeFromDb(id, NodeTypeLabel.LapTime)

    if (!node) {
        return false
    }

    return mapDbNodeToLapTimeNode(node)
}
