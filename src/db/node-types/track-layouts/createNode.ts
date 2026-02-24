import {InputTrackLayoutCreate} from "./types/InputTrackLayoutCreate"
import {TrackLayoutNode} from "./types/TrackLayoutNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"
import {mapDbNodeToTrackLayoutNode} from "./mapDbNodeToTrackLayoutNode"

export async function createNode(data: InputTrackLayoutCreate): Promise<TrackLayoutNode> {
    const node = await createNeo4jNode(DbNodeType.TrackLayout, data)

    return mapDbNodeToTrackLayoutNode(node)
}
