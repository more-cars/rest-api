import {InputBrandCreate} from "./types/InputBrandCreate"
import {BrandNode} from "./types/BrandNode"
import {createDbNode} from "../createDbNode"
import {Neo4jNodeType} from "../../types/Neo4jNodeType"
import {mapDbNodeToBrandNode} from "./mapDbNodeToBrandNode"

export async function createNode(data: InputBrandCreate): Promise<BrandNode> {
    const node = await createDbNode(Neo4jNodeType.Brand, data)

    return mapDbNodeToBrandNode(node)
}
