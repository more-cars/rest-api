import {InputMotorShowCreate} from "./types/InputMotorShowCreate"
import {MotorShowNode} from "./types/MotorShowNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertMotorShowNeo4jNodeToDbNode} from "./convertMotorShowNeo4jNodeToDbNode"

export async function createNode(data: InputMotorShowCreate): Promise<MotorShowNode> {
    const node = await createNeo4jNode(DbNodeType.MotorShow, data)

    return convertMotorShowNeo4jNodeToDbNode(node)
}
