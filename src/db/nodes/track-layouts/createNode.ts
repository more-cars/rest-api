import {InputTrackLayoutCreate} from "./types/InputTrackLayoutCreate"
import {TrackLayoutNode} from "./types/TrackLayoutNode"
import {createDbNode} from "../createDbNode"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToTrackLayoutNode} from "./mapDbNodeToTrackLayoutNode"

export async function createNode(data: InputTrackLayoutCreate): Promise<TrackLayoutNode> {
    const node = await createDbNode(NodeTypeLabel.TrackLayout, data)

    return mapDbNodeToTrackLayoutNode(node)
}
