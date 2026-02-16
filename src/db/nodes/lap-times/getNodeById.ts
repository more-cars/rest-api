import {LapTimeNode} from "./types/LapTimeNode"
import {fetchNodeById} from "../fetchNodeById"
import {mapDbNodeToLapTimeNode} from "./mapDbNodeToLapTimeNode"

export async function getNodeById(id: number): Promise<false | LapTimeNode> {
    const node = await fetchNodeById(id)

    if (!node) {
        return false
    }

    return mapDbNodeToLapTimeNode(node)
}
