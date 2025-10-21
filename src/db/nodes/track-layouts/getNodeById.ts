import {TrackLayoutNode} from "./types/TrackLayoutNode"
import {fetchNodeFromDb} from "../fetchNodeFromDb"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToTrackLayoutNode} from "./mapDbNodeToTrackLayoutNode"

export async function getNodeById(id: number): Promise<false | TrackLayoutNode> {
    const node = await fetchNodeFromDb(id, NodeTypeLabel.TrackLayout)

    if (!node) {
        return false
    }

    return mapDbNodeToTrackLayoutNode(node)
}
