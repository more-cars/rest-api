import {InputTrackLayoutCreate} from "./types/InputTrackLayoutCreate"
import {TrackLayoutNode} from "./types/TrackLayoutNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"

export async function createNode(data: InputTrackLayoutCreate): Promise<TrackLayoutNode> {
    return await createNeo4jNode(DbNodeType.TrackLayout, data) as TrackLayoutNode
}
