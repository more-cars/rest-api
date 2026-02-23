import {InputSessionResultCreate} from "./types/InputSessionResultCreate"
import {SessionResultNode} from "./types/SessionResultNode"
import {createDbNode} from "../../nodes/createDbNode"
import {DbNodeType} from "../../types/DbNodeType"
import {mapDbNodeToSessionResultNode} from "./mapDbNodeToSessionResultNode"

export async function createNode(data: InputSessionResultCreate): Promise<SessionResultNode> {
    const node = await createDbNode(DbNodeType.SessionResult, data)

    return mapDbNodeToSessionResultNode(node)
}
