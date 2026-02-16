import {InputImageCreate} from "./types/InputImageCreate"
import {ImageNode} from "./types/ImageNode"
import {createDbNode} from "../createDbNode"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToImageNode} from "./mapDbNodeToImageNode"

export async function createNode(data: InputImageCreate): Promise<ImageNode> {
    const node = await createDbNode(NodeTypeLabel.Image, data)

    return mapDbNodeToImageNode(node)
}
