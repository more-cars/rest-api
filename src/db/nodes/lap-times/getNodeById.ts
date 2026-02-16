import {LapTimeNode} from "./types/LapTimeNode"
import {fetchNodeFromDb} from "../fetchNodeFromDb"
import {mapDbNodeToLapTimeNode} from "./mapDbNodeToLapTimeNode"

export async function getNodeById(id: number): Promise<false | LapTimeNode> {
    const node = await fetchNodeFromDb(id)

    if (!node) {
        return false
    }

    return mapDbNodeToLapTimeNode(node)
}
