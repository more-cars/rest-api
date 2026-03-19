import {InputModelCarCreate} from "./types/InputModelCarCreate"
import {ModelCarNode} from "./types/ModelCarNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertModelCarNeo4jNodeToDbNode} from "./convertModelCarNeo4jNodeToDbNode"

export async function createNode(data: InputModelCarCreate): Promise<ModelCarNode> {
    const node = await createNeo4jNode(DbNodeType.ModelCar, data)

    return convertModelCarNeo4jNodeToDbNode(node)
}
