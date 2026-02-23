import {InputTrackLayoutCreate} from "./types/InputTrackLayoutCreate"
import {TrackLayoutNode} from "./types/TrackLayoutNode"
import {createDbNode} from "../../nodes/createDbNode"
import {DbNodeType} from "../../types/DbNodeType"
import {mapDbNodeToTrackLayoutNode} from "./mapDbNodeToTrackLayoutNode"

export async function createNode(data: InputTrackLayoutCreate): Promise<TrackLayoutNode> {
    const node = await createDbNode(DbNodeType.TrackLayout, data)

    return mapDbNodeToTrackLayoutNode(node)
}
