import {InputModelCarBrandCreate} from "./types/InputModelCarBrandCreate"
import {ModelCarBrandNode} from "./types/ModelCarBrandNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertModelCarBrandNeo4jNodeToDbNode} from "./convertModelCarBrandNeo4jNodeToDbNode"

export async function createNode(data: InputModelCarBrandCreate): Promise<ModelCarBrandNode> {
    const node = await createNeo4jNode(DbNodeType.ModelCarBrand, data)

    return convertModelCarBrandNeo4jNodeToDbNode(node)
}
