import {InputBrandCreate} from "./types/InputBrandCreate"
import {BrandNode} from "./types/BrandNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"

export async function createNode(data: InputBrandCreate): Promise<BrandNode> {
    return await createNeo4jNode(DbNodeType.Brand, data) as BrandNode
}
