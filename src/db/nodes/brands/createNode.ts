import {InputBrandCreate} from "./types/InputBrandCreate"
import {BrandNode} from "./types/BrandNode"
import {createDbNode} from "../createDbNode"
import {DbNodeType} from "../../types/DbNodeType"
import {mapDbNodeToBrandNode} from "./mapDbNodeToBrandNode"

export async function createNode(data: InputBrandCreate): Promise<BrandNode> {
    const node = await createDbNode(DbNodeType.Brand, data)

    return mapDbNodeToBrandNode(node)
}
