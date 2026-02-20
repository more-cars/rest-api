import {InputTrackLayoutCreate} from "./types/InputTrackLayoutCreate"
import {TrackLayoutNode} from "./types/TrackLayoutNode"
import {createDbNode} from "../createDbNode"
import {Neo4jNodeType} from "../../types/Neo4jNodeType"
import {mapDbNodeToTrackLayoutNode} from "./mapDbNodeToTrackLayoutNode"

export async function createNode(data: InputTrackLayoutCreate): Promise<TrackLayoutNode> {
    const node = await createDbNode(Neo4jNodeType.TrackLayout, data)

    return mapDbNodeToTrackLayoutNode(node)
}
