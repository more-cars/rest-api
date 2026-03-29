import {InputVideoCreate} from "./types/InputVideoCreate"
import {VideoNode} from "./types/VideoNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertVideoNeo4jNodeToDbNode} from "./convertVideoNeo4jNodeToDbNode"

export async function createNode(data: InputVideoCreate): Promise<VideoNode> {
    const node = await createNeo4jNode(DbNodeType.Video, data)

    return convertVideoNeo4jNodeToDbNode(node)
}
