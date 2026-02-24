import {InputImageCreate} from "./types/InputImageCreate"
import {ImageNode} from "./types/ImageNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertImageNeo4jNodeToDbNode} from "./convertImageNeo4jNodeToDbNode"

export async function createNode(data: InputImageCreate): Promise<ImageNode> {
    const node = await createNeo4jNode(DbNodeType.Image, data)

    return convertImageNeo4jNodeToDbNode(node)
}
