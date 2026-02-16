import {InputBrandCreate} from "./types/InputBrandCreate"
import {BrandNode} from "./types/BrandNode"
import {createDbNode} from "../createDbNode"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToBrandNode} from "./mapDbNodeToBrandNode"

export async function createNode(data: InputBrandCreate): Promise<BrandNode> {
    const node = await createDbNode(NodeTypeLabel.Brand, data)

    return mapDbNodeToBrandNode(node)
}
