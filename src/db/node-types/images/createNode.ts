import {InputImageCreate} from "./types/InputImageCreate"
import {ImageNode} from "./types/ImageNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"

export async function createNode(data: InputImageCreate): Promise<ImageNode> {
    return await createNeo4jNode(DbNodeType.Image, data) as ImageNode
}
