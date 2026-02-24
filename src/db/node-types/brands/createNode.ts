import {InputBrandCreate} from "./types/InputBrandCreate"
import {BrandNode} from "./types/BrandNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertBrandNeo4jNodeToDbNode} from "./convertBrandNeo4jNodeToDbNode"

export async function createNode(data: InputBrandCreate): Promise<BrandNode> {
    const node = await createNeo4jNode(DbNodeType.Brand, data)

    return convertBrandNeo4jNodeToDbNode(node)
}
