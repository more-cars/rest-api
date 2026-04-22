import {InputModelCarCreate} from "./types/InputModelCarCreate"
import {ModelCarNode} from "./types/ModelCarNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"

export async function createNode(data: InputModelCarCreate): Promise<ModelCarNode> {
    return await createNeo4jNode(DbNodeType.ModelCar, data) as ModelCarNode
}
