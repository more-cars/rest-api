import {InputSessionResultCreate} from "./types/InputSessionResultCreate"
import {SessionResultNode} from "./types/SessionResultNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertSessionResultNeo4jNodeToDbNode} from "./convertSessionResultNeo4jNodeToDbNode"

export async function createNode(data: InputSessionResultCreate): Promise<SessionResultNode> {
    const node = await createNeo4jNode(DbNodeType.SessionResult, data)

    return convertSessionResultNeo4jNodeToDbNode(node)
}
