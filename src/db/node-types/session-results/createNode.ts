import {InputSessionResultCreate} from "./types/InputSessionResultCreate"
import {SessionResultNode} from "./types/SessionResultNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"

export async function createNode(data: InputSessionResultCreate): Promise<SessionResultNode> {
    return await createNeo4jNode(DbNodeType.SessionResult, data) as SessionResultNode
}
