import {InputImageCreate} from "./types/InputImageCreate"
import {ImageNode} from "./types/ImageNode"
import {createDbNode} from "../createDbNode"
import {Neo4jNodeType} from "../../types/Neo4jNodeType"
import {mapDbNodeToImageNode} from "./mapDbNodeToImageNode"

export async function createNode(data: InputImageCreate): Promise<ImageNode> {
    const node = await createDbNode(Neo4jNodeType.Image, data)

    return mapDbNodeToImageNode(node)
}
