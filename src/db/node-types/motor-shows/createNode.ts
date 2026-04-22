import {InputMotorShowCreate} from "./types/InputMotorShowCreate"
import {MotorShowNode} from "./types/MotorShowNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"

export async function createNode(data: InputMotorShowCreate): Promise<MotorShowNode> {
    return await createNeo4jNode(DbNodeType.MotorShow, data) as MotorShowNode
}
