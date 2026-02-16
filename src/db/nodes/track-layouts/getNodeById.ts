import {TrackLayoutNode} from "./types/TrackLayoutNode"
import {fetchNodeFromDb} from "../fetchNodeFromDb"
import {mapDbNodeToTrackLayoutNode} from "./mapDbNodeToTrackLayoutNode"

export async function getNodeById(id: number): Promise<false | TrackLayoutNode> {
    const node = await fetchNodeFromDb(id)

    if (!node) {
        return false
    }

    return mapDbNodeToTrackLayoutNode(node)
}
