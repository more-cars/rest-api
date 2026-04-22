import {InputVideoCreate} from "./types/InputVideoCreate"
import {VideoNode} from "./types/VideoNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"

export async function createNode(data: InputVideoCreate): Promise<VideoNode> {
    return await createNeo4jNode(DbNodeType.Video, data) as VideoNode
}
