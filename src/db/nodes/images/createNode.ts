import {InputImageCreate} from "./types/InputImageCreate"
import {ImageNode} from "./types/ImageNode"
import {createDbNode} from "../createDbNode"
import {DbNodeType} from "../../types/DbNodeType"
import {mapDbNodeToImageNode} from "./mapDbNodeToImageNode"

export async function createNode(data: InputImageCreate): Promise<ImageNode> {
    const node = await createDbNode(DbNodeType.Image, data)

    return mapDbNodeToImageNode(node)
}
