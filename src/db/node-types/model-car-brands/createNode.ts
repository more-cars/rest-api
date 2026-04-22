import {InputModelCarBrandCreate} from "./types/InputModelCarBrandCreate"
import {ModelCarBrandNode} from "./types/ModelCarBrandNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"

export async function createNode(data: InputModelCarBrandCreate): Promise<ModelCarBrandNode> {
    return await createNeo4jNode(DbNodeType.ModelCarBrand, data) as ModelCarBrandNode
}
