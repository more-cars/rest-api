import {TrackLayoutNode} from "./types/TrackLayoutNode"
import {fetchNodeById} from "../fetchNodeById"
import {mapDbNodeToTrackLayoutNode} from "./mapDbNodeToTrackLayoutNode"

export async function getNodeById(id: number): Promise<false | TrackLayoutNode> {
    const node = await fetchNodeById(id)

    if (!node) {
        return false
    }

    return mapDbNodeToTrackLayoutNode(node)
}
